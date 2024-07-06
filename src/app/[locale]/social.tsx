import { getSocialMedia } from "./(dashboard)/actions";

import Icon from "@/components/Icon";

export const Social = async () => {
  const socialMedia = await getSocialMedia();

  return (
    <>
      {socialMedia.map((link) => {
        return (
          <a key={link.id} href={link.url} rel="noreferrer" target="_blank">
            <Icon className="w-12 h-12" name={link.Icon?.name as any} />
          </a>
        );
      })}
    </>
  );
};
