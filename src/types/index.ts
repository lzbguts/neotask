import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TranslationType = (key: string, args?: any) => string;

export type Icon = {
  id: string;
  name: string;
};

export type Link = {
  id: string;
  name: string;
  url: string;
  type: string;
  Icon: Icon;
};
