import { TextInputPropsType } from "@sito/dashboard";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export interface ParagraphInputPropsType
  extends Pick<
      TextInputPropsType,
      | "label"
      | "state"
      | "containerClassName"
      | "inputClassName"
      | "labelClassName"
      | "helperText"
      | "helperTextClassName"
    >,
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {}
