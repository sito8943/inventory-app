import { QueryKey } from "@tanstack/react-query";

export type UseConfirmationPropsType<TInDto, TError extends Error> = {
  mutationFn: (data: TInDto[]) => Promise<TInDto>;
  onError?: (error: TError) => void;
  onSuccess?: (data: TInDto) => void;
  queryKey: QueryKey;
  onSuccessMessage?: string;
};
