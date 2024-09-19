import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { auth } from "@/auth";

interface PrivateLayoutProps {
  children: ReactNode;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: t("titles.tasks"),
  };
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await auth()
  const user = session?.user
  const locale = await getLocale();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return <>{children}</>;
}
