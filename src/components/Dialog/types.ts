import { ReactNode } from "react";
import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

export type DialogPropsType = {
  open?: boolean;
  title: string;
  children?: ReactNode;
  handleClose: () => void;
  containerClassName?: string;
  className?: string;
};

export interface ConfirmationDialogPropsType extends DialogPropsType {
  handleSubmit: () => void;
  isLoading?: boolean;
}

export interface FormDialogPropsType<
  TFormType extends FieldValues,
  TError extends Error = Error,
> extends DialogPropsType {
  control?: Control<TFormType>;
  getValues?: UseFormGetValues<TFormType>;
  setValue?: UseFormSetValue<TFormType>;
  reset?: UseFormReset<TFormType>;
  setError?: UseFormSetError<TFormType>;
  handleSubmit: UseFormHandleSubmit<TFormType>;
  onSubmit: SubmitHandler<TFormType>;
  parseFormError?: (error: TError) => string[];
  releaseFormError?: () => void;
  onClick: (id?: number) => void;
  /* if the buttons are aligned to the end */
  buttonEnd?: boolean;
  isLoading?: boolean;
}
