import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

// hooks
import useDialog from "../../../hooks/useDialog";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

function useEditCategory() {
  const { t } = useTranslation();

  const manager = useManager();

  const { control, handleSubmit, reset } = useForm();

  const { open, handleClose, handleOpen } = useDialog();

  const [id, setId] = useState(0);

  const { data, isLoading } = useQuery({
    queryFn: () => manager.Categories.getById(id),
    queryKey: [ReactQueryKeys.Categories, id],
    enabled: !!id,
  });

  useEffect(() => {
    if (data && data.length) reset({ ...data[0] });
  }, [data]);

  const close = () => {
    handleClose();
    setId(0);
    reset();
  };

  const onClick = async (id) => {
    setId(id);
    handleOpen();
  };

  const editFn = useMutation({
    mutationFn: (data) => manager.Categories.update(data),
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
    title: t("_pages:categories.forms.edit"),
    open,
    control,
    isLoading,
    handleSubmit: handleSubmit((data) => editFn.mutate(data)),
    handleClose: close,
  };
}

export default useEditCategory;
