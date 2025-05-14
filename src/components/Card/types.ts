import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { ActionPropsType } from "../Actions/";

export interface AddCardPropsType
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: (e: any) => void;
  tooltip: string;
}

export type ItemCardPropsType = {
  children: ReactNode;
  containerClassName?: string;
  actions: ActionPropsType[];
  title: string | ReactNode;
  className?: string;
  name: string;
  onClick?: () => void;
};
