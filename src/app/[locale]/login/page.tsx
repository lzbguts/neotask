"use client";

import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { getTranslationKey } from "@/utils/functions";
import { LoginSchema } from "@/schemas/login";

export default function Login() {
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
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);

    const res = await supabase.auth.signInWithPassword({
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
    <div className="flex flex-col gap-8 items-center justify-center">
      <Image alt="NeoTask" height={200} src="/logo.png" width={200} />
      <p className="font-bold">Login</p>
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
          {loading ? <Loader2 className="animate-spin" /> : t("login.sign-in")}
        </Button>
        <a href={`/${locale}/login/sign-up`}>{t("login.sign-up")}</a>
      </form>
    </div>
  );
}
