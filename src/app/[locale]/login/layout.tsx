import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { createClient } from "@/utils/supabase/server";

interface PrivateLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Login",
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const locale = await getLocale();

  if (user) {
    redirect(`/${locale}`);
  }

  return <>{children}</>;
}
