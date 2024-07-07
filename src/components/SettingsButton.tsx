"use client";

import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/modal";
import { SettingsModal } from "./SettingsModal";

export const SettingsButton = () => {
  const router = useRouter();
  const t = useTranslations();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        {t("header.settings")}
      </Button>
      <SettingsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}