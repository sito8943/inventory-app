import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function useDeleteAction(props) {
  const { t } = useTranslation();

  const { onClick } = props;

  const action = (record) => ({
    id: "delete",
    hidden: !!record.deletedAt,
    disabled: !!record.deletedAt,
    icon: <FontAwesomeIcon className="text-red-500" icon={faTrash} />,
    tooltip: t("_pages:common.actions.delete.text"),
    onClick: () => onClick(record),
  });

  return action;
}

export default useDeleteAction;
