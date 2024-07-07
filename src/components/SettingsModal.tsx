import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useLocale, useTranslations } from "next-intl";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const SettingsModal = ({ isOpen, onOpenChange }: Props) => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter()
  const locale = useLocale()
  const { setTheme } = useTheme()

  const changeLanguage = (newLocale: string) => {
    const newUrl = pathname.replace(`/${locale}`, `/${newLocale}`);

    router.replace(newUrl);
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="py-4">
        {(onClose) => (
          <>
            <ModalHeader>{t("header.settings")}</ModalHeader>
            <ModalBody>
              <Select
                label={t("settings.select-language")}
              >
                <SelectItem key="en" onClick={() => changeLanguage("en")}>{t("settings.english")}</SelectItem>
                <SelectItem key="pt" onClick={() => changeLanguage("pt")}>{t("settings.portuguese")}</SelectItem>
              </Select>
              <Select
                label={t("settings.select-theme")}
              >
                <SelectItem key="light" onClick={() => setTheme("light")}>{t("settings.light")}</SelectItem>
                <SelectItem key="dark" onClick={() => setTheme("dark")}>{t("settings.dark")}</SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {t("settings.close")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}