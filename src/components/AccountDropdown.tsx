"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/modal";
import { SettingsModal } from "./SettingsModal";
import { User } from "next-auth";
import { signOut } from "@/auth";
import { logout } from "@/utils/login";

type Props = {
  user: User | null;
};

export default function AccountDropdown({ user }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <SettingsModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Dropdown>
        <DropdownTrigger>
          <Avatar isBordered as="button" className="transition-transform" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile">
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            onClick={onOpen}
          >
            {t("header.settings")}
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => logout()}>
            {t("header.logout")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
