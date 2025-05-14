import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface TextInputPropsType
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: ReactNode;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: string;
}

export interface ColorInputPropsTypes
  extends Omit<TextInputPropsType, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export type SelectInputOptionType = {
  value: string;
  id: number;
};

export interface SelectInputPropsTypes
  extends Omit<TextInputPropsType, "onChange"> {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectInputOptionType[];
}
