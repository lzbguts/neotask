"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTask } from "../actions";

import { TaskSchema } from "@/schemas/task";
import { useToast } from "@/components/ui/use-toast";
import { getTranslationKey } from "@/utils/functions";
import { User } from "next-auth";

type Props = {
  user: User | undefined;
};

export const NewTask = ({ user }: Props) => {
  const t = useTranslations();
  const schema = TaskSchema(t);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      setLoading(true);
      await createTask({ title: title, userId: user?.id || "" });
      setLoading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
    },
    onError: (error) => {
      toast({
        title: t("titles.error"),
        description: t(`errors.${getTranslationKey(error.message)}`),
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    mutation.mutate(data);
  };

  return (
    <form
      className="flex flex-row justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("title")}
        classNames={{
          inputWrapper:
            "rounded-r-none rounded-lt-3xl rounded-b-none shadow-none bg-box-secondary",
        }}
        placeholder={t("dashboard.new-task")}
      />
      <Button
        isIconOnly
        aria-label={t("dashboard.new-task")}
        className="rounded-b-none rounded-l-none bg-box-secondary"
        type="submit"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Plus />}
      </Button>
    </form>
  );
};
