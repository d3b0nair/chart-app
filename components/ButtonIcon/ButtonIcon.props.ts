import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import upIcon from "./../../icons/UpIcon.svg";
import closeIcon from "./../../icons/CloseIcon.svg";
import hamburgerIcon from "./../../icons/HamburgerIcon.svg";

export const icons = {
  upIcon,
  closeIcon,
  hamburgerIcon,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearance: "primary" | "white";
  icon: IconName;
}
