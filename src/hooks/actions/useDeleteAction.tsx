import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// types
import { UseMultipleActionPropTypes } from "hooks";
import { BaseEntityDto } from "lib";

export const useDeleteAction = (props: UseMultipleActionPropTypes<number>) => {
  const { t } = useTranslation();

  const { onClick, hidden = false } = props;

  return (record: BaseEntityDto) => ({
    id: "delete",
    hidden: !!record.deletedAt || hidden,
    disabled: !!record.deletedAt,
    icon: <FontAwesomeIcon className="text-red-500" icon={faTrash} />,
    tooltip: t("_pages:common.actions.delete.text"),
    onClick: () => onClick([record?.id]),
  });
};
