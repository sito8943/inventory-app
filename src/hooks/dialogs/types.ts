import { MutationFunction, QueryKey } from "@tanstack/react-query";
import { DefaultValues, FieldValues } from "react-hook-form";

// types
import { ValidationError } from "lib";

export type UseDeleteDialogPropsType = {
  mutationFn: (data: number[]) => Promise<number>;
  queryKey: QueryKey;
};

export interface UseFormDialogPropsType<TInput extends FieldValues, TResponse> {
  defaultValues?: DefaultValues<TInput>;
  getFunction?: (id: number) => Promise<TInput>;
  mutationFn: MutationFunction<TResponse, TInput>;
  onError?: (errors: ValidationError) => void;
  onSuccess?: (data: TResponse) => void;
  queryKey: QueryKey;
  onSuccessMessage: string;
  title: string;
}
