import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

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
    title: t("titles.sign-up"),
  };
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return <>{children}</>;
}
