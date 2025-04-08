import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

// providers
import { useManager } from "../../../../providers/ManagerProvider";

// hooks
import useDialog from "../../../../hooks/useDialog";
import useMovementLogsAction from "../actions/useMovementLogsAction";

// utils
import { ReactQueryKeys } from "../../../../utils/queryKey";

export default function useMovementLogs() {
  const { t } = useTranslation();

  const manager = useManager();

  const [id, setId] = useState(0);

  const { data, isLoading } = useQuery({
    queryFn: () => manager.Products.logs(id),
    queryKey: [ReactQueryKeys.MovementLogs, id],
  });

  const { open, handleClose, handleOpen } = useDialog();

  const onClick = (id) => {
    setId(id);
    handleOpen();
  };

  const action = useMovementLogsAction({ onClick });

  return {
    action,
    title: t("_pages:products.forms.movementLogs"),
    open,
    data,
    isLoading,
    handleClose,
  };
}
