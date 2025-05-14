import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

// hooks
import { useDialog, useProductMovements, useTimeAge } from "hooks";
import useTableOptions from "../../../../components/Table/useTableOptions";

// actions
import useMovementLogsAction from "../actions/useMovementLogsAction";

// types
import { TablesCamelCase } from "../../../../db/types/dbUtils.ts";

export function useMovementLogs() {
  const { t } = useTranslation();

  const { timeAge } = useTimeAge();

  const [id, setId] = useState(0);

  const { data, isLoading } = useProductMovements({ id });

  const { open, handleClose, handleOpen } = useDialog();

  const tableProps = useTableOptions({
    emptyMessage: t("_pages:movements.empty"),
    data,
    entity: TablesCamelCase.MovementLogs,
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
          parser: (value: string) => timeAge(new Date(value)),
          showTooltip: true,
        },
      },
    },
    ignoreColumns: ["id", "product"],
  });

  const onClick = useCallback(
    (id: number) => {
      setId(id);
      handleOpen();
    },
    [handleOpen],
  );

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
