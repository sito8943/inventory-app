import { useTranslation } from "react-i18next";

// types
import { ProductDto } from "lib";
import { UseSingleActionPropTypes } from "hooks";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function useMovementLogsAction(props: UseSingleActionPropTypes<number>) {
  const { t } = useTranslation();

  const { onClick, hidden } = props;

  return (record: ProductDto) => ({
    id: "movementLogs",
    hidden: hidden || !!record.deletedAt,
    disabled: !!record.deletedAt,
    icon: <FontAwesomeIcon className="text-primary" icon={faClock} />,
    tooltip: t("_pages:products.forms.movementLogs"),
    onClick: () => onClick(record?.id),
  });
}

export default useMovementLogsAction;
