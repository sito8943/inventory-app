import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

// hooks
import useDialogForm from "../../../hooks/useDialogForm";

function useAddProduct() {
  const { t } = useTranslation();

  const manager = useManager();

  const {
    control,
    handleSubmit,
    open,
    close,
    onClick,
    parseFormError,
    releaseFormError,
  } = useDialogForm({});

  const addFn = useMutation({
    mutationFn: (data) => manager.Products.insert(data),
    onError: (error) => {
      console.error(error);
      parseFormError(error);
      //TODO THROW NOTIFICATION HERE
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries([ReactQueryKeys.Products]);
      close();
      //TODO THROW NOTIFICATION HERE
    },
  });

  return {
    onClick,
    title: t("_pages:products.forms.add"),
    open,
    control,
    handleSubmit: handleSubmit((data) => {
      releaseFormError();
      addFn.mutate(data);
    }),
    handleClose: close,
  };
}

export default useAddProduct;
