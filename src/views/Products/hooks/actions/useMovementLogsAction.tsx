import { useTranslation } from "react-i18next";
import { useCallback } from "react";

// lib
import { ProductDto } from "lib";

// hooks
import { UseSingleActionPropTypes } from "hooks";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export function useMovementLogsAction(props: UseSingleActionPropTypes<number>) {
  const { t } = useTranslation();

  const { onClick, hidden } = props;

  const action = useCallback(
    (record: ProductDto) => ({
      id: "movementLogs",
      hidden: hidden || record.deleted,
      disabled: record.deleted,
      icon: <FontAwesomeIcon className="text-primary" icon={faClock} />,
      tooltip: t("_pages:products.forms.movementLogs"),
      onClick: () => onClick(record?.id),
    }),
    [hidden, onClick, t]
  );

  return { action };
}
