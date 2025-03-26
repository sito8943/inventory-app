import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

// hooks
import useDialog from "../../../hooks/useDialog";

function useAddCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, handleSubmit, reset } = useForm();

  const { open, handleClose, handleOpen } = useDialog();

  const onClick = () => handleOpen();

  const close = () => {
    handleClose();
    reset();
  };

  const addFn = useMutation({
    mutationFn: (data) => manager.Categories.insert(data),
    onError: (error) => {
      console.error(error);
      //TODO THROW NOTIFICATION HERE
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.Categories]);
      close();
      //TODO THROW NOTIFICATION HERE
    },
  });

  return {
    onClick,
    title: t("_pages:categories.forms.add"),
    open,
    control,
    handleSubmit: handleSubmit((data) => addFn.mutate(data)),
    handleClose: close,
  };
}

export default useAddCategory;
