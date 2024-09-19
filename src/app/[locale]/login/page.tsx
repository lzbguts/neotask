"use client";

import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { login } from "@/utils/login";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Login() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Image alt="NeoTask" height={200} src="/logo.png" width={200} />
      <p className="font-bold">Login</p>
      <div className="flex flex-col justify-center items-center gap-4">
        <Button
          type="button"
          className="w-full"
          onClick={() => login("google")}
          endContent={<FaGoogle />}
        >
          {t("login.with", { provider: "Google" })}
        </Button>
        <Button
          type="button"
          className="w-full"
          onClick={() => login("github")}
          endContent={<FaGithub />}
        >
          {t("login.with", { provider: "GitHub" })}
        </Button>
      </div>
    </div>
  );
}
