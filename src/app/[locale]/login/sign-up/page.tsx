"use client";

import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";

import { getTranslationKey } from "@/utils/functions";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LoginSchema } from "@/schemas/login";

export default function SignUp() {
  const t = useTranslations();
  const schema = LoginSchema(t);
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);

    const res = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      toast({
        title: t("titles.error"),
        description: t(`errors.${getTranslationKey(res.error.message)}`),
      });
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-8">
      <Image alt="NeoTask" height={200} src="/logo.png" width={200} />
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          label="Email"
          type="email"
        />
        <Input
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          label={t("login.password")}
          type="password"
        />
        <Button className="w-full" type="submit">
          {loading ? <Spinner color="danger" /> : t("login.sign-up")}
        </Button>
        <a href={`/${locale}/login/`}>{t("login.back")}</a>
      </form>
    </div>
  );
}
