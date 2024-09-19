import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { auth } from "@/auth";

interface PrivateLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Login",
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth()
  const user = session?.user
  const locale = await getLocale();

  if (user) {
    redirect(`/${locale}`);
  }

  return <>{children}</>;
}
