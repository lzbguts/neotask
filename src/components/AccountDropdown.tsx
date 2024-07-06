"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useLocale, useTranslations } from "next-intl";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

type Props = {
  user: User | null;
};

export default function AccountDropdown({ user }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
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
          onClick={() => router.push(`/${locale}/settings`)}
        >
          {t("header.settings")}
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={signOut}>
          {t("header.logout")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
