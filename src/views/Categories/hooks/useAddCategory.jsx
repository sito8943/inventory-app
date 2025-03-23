import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

function useAddCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, handleSubmit } = useForm();

  const [open, setOpen] = useState();

  const handleClose = () => setOpen(false);

  const onClick = () => setOpen(true);

  const addFn = useMutation({
    mutationFn: (data) => manager.Categories.insert(data),
    onError: (error) => {
      console.error(error);
      //TODO THROW NOTIFICATION HERE
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.Categories]);
      //TODO THROW NOTIFICATION HERE
    },
  });

  return {
    onClick,
    formProps: {
      handleSubmit: handleSubmit((d) => addFn.mutate(d)),
      control,
    },
    dialogProps: {
      title: t("_pages:categories.forms.add"),
      open,
      handleClose,
    },
  };
}

export default useAddCategory;
