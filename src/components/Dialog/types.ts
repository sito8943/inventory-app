import { ReactNode } from "react";
import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetError,
} from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { ValidationError } from "lib";

export type DialogPropsType = {
  open?: boolean;
  title: string;
  children?: ReactNode;
  handleClose: () => void;
  isLoading?: boolean;
  containerClassName?: string;
  className?: string;
};

export interface ConfirmationDialogPropsType extends DialogPropsType {
  handleSubmit: () => void;
}

export interface FormDialogPropsType<
  TInput extends FieldValues = FieldValues,
  TResponse = unknown,
  TError extends Error = Error,
> extends DialogPropsType {
  control: Control<TInput>;
  getValues?: UseFormGetValues<TInput>;
  reset?: UseFormReset<TInput>;
  setError?: UseFormSetError<TInput>;
  handleSubmit: UseFormHandleSubmit<TInput>;
  onSubmit: SubmitHandler<TInput>;
  parseFormError?: (error: TError) => string[];
  releaseFormError?: () => void;
  dialogFn: UseMutationResult<TResponse, ValidationError, TInput>;
  onClick: (id: number) => void;
  /* if the buttons are aligned to the end */
  buttonEnd?: boolean;
}
