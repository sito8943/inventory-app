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

// hooks
import useTableOptions from "../../../../components/Table/useTableOptions";
import useTimeAge from "../../../../hooks/useTimeAge";

export function useMovementLogs() {
  const { t } = useTranslation();

  const { timeAge } = useTimeAge();

  const manager = useManager();

  const [id, setId] = useState(0);

  const { data, isLoading } = useQuery({
    queryFn: () => manager.Products.movementLogs(id),
    queryKey: [ReactQueryKeys.MovementLogs, id],
  });

  const { open, handleClose, handleOpen } = useDialog();

  const tableProps = useTableOptions({
    emptyMessage: t("_pages:movements.empty"),
    data,
    entity: "movementLogs",
    customOptions: {
      stock: {
        columnOptions: { className: "text-right" },
        rowOptions: {
          className: "text-right",
        },
      },
      result: {
        columnOptions: { className: "text-right" },
        rowOptions: {
          className: "text-right",
        },
      },
      createdAt: {
        rowOptions: {
          parser: (value) => timeAge(new Date(value)),
          showTooltip: true,
        },
      },
    },
    ignoreColumns: ["id", "product"],
  });

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
    tableProps,
    containerClassName: "h-[60vh]",
  };
}
