import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function useMovementLogsAction(props) {
  const { t } = useTranslation();

  const { onClick } = props;

  const action = (record) => ({
    id: "movementLogs",
    hidden: !!record.deletedAt,
    disabled: !!record.deletedAt,
    icon: <FontAwesomeIcon className="text-primary" icon={faClock} />,
    tooltip: t("_pages:products.forms.movementLogs"),
    onClick: () => onClick(record?.id),
  });

  return action;
}

export default useMovementLogsAction;
