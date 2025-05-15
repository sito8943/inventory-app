import { MutationFunction, QueryKey } from "@tanstack/react-query";
import { DefaultValues, FieldValues } from "react-hook-form";

// types
import { ValidationError } from "lib";

export type UseDeleteDialogPropsType = {
  mutationFn: (data: number[]) => Promise<number>;
  queryKey: QueryKey;
};

export interface UseFormDialogPropsType<
  TDto,
  TMutationDto,
  TMutationOutputDto,
  TFormType extends FieldValues,
> {
  defaultValues?: DefaultValues<TFormType>;
  getFunction?: (id: number) => Promise<TDto>;
  formToDto: (data: TFormType) => TMutationDto;
  dtoToForm: (data: TDto) => TFormType;
  mutationFn: MutationFunction<TMutationOutputDto, TMutationDto>;
  onError?: (errors: ValidationError) => void;
  onSuccess?: (data: TMutationOutputDto) => void;
  queryKey: QueryKey;
  onSuccessMessage: string;
  title: string;
}
