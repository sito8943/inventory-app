import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";

// providers
import { queryClient, useNotification } from "providers";

// lib
import { NotificationEnumType, NotificationType, ValidationError } from "lib";

// hooks
import { useDialog } from "hooks";

// types
import { UseFormDialogPropsType } from "hooks";
import { FormDialogPropsType } from "components";

export const useFormDialog = <TInput extends FieldValues, TResponse>(
  props: UseFormDialogPropsType<TInput, TResponse>,
): FormDialogPropsType<TInput, TResponse, ValidationError> => {
  const { t } = useTranslation();
  const { showStackNotifications, showSuccessNotification } = useNotification();

  const {
    defaultValues,
    getFunction,
    mutationFn,
    onError,
    onSuccess,
    queryKey,
    onSuccessMessage,
    title,
  } = props;

  const [id, setId] = useState(0);

  const { open, handleClose, handleOpen } = useDialog();

  const { control, handleSubmit, reset, setError, getValues } = useForm<
    TInput,
    TResponse
  >({
    defaultValues,
  });

  const { data, isLoading } = useQuery({
    queryFn: () => getFunction?.(id),
    queryKey: [...queryKey, id],
    enabled: !!getFunction && !!queryKey && !!id,
  });

  useEffect(() => {
    if (data && data.length) reset({ ...data[0] });
  }, [data]);

  const parseFormError = useCallback(
    (error: ValidationError) => {
      const valError = error?.errors;
      const messages: string[] = [];
      if (valError) {
        valError.forEach(([key, message]) => {
          const input = document.querySelector(`[name="${key}"]`);
          if (
            input instanceof HTMLInputElement ||
            input instanceof HTMLTextAreaElement ||
            input instanceof HTMLSelectElement
          ) {
            input.focus();
            input.classList.add("error");
            messages.push(t(`_pages:${queryKey}.inputs.${key}.${message}`));
          }
        });
      }
      return messages;
    },
    [t, queryKey],
  );

  const releaseFormError = useCallback(() => {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.classList.remove("error");
    });
  }, []);

  const onClick = useCallback(
    (id: number) => {
      setId(id);
      handleOpen();
    },
    [handleOpen],
  );

  const close = useCallback(() => {
    releaseFormError();
    handleClose();
    reset();
  }, [reset, releaseFormError, handleClose]);

  const dialogFn = useMutation<TResponse, ValidationError, TInput>({
    mutationFn,
    onError: (error: ValidationError) => {
      console.error(error);
      if (error.errors) {
        const messages = parseFormError(error);
        showStackNotifications(
          messages.map(
            (message) =>
              ({
                message,
                type: NotificationEnumType.error,
              }) as NotificationType,
          ),
        );
      }
      if (onError) onError(error);
    },
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onSuccess) onSuccess(result);
      showSuccessNotification({
        message: onSuccessMessage,
      } as NotificationType);
      close();
    },
  });

  return {
    open,
    onClick,
    handleClose: close,
    control,
    getValues,
    handleSubmit,
    onSubmit: (data) => dialogFn.mutate(data),
    reset,
    setError,
    parseFormError,
    releaseFormError,
    dialogFn,
    title,
    isLoading: isLoading || dialogFn.isPending,
  };
};
