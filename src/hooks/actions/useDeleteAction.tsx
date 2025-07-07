import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// types
import { UseMultipleActionPropTypes } from "hooks";
import { BaseEntityDto } from "lib";
import { useCallback } from "react";

export const useDeleteAction = (props: UseMultipleActionPropTypes<number>) => {
  const { t } = useTranslation();

  const { onClick, hidden = false } = props;

  const action = useCallback(
    (record: BaseEntityDto) => ({
      id: "delete",
      hidden: record.deleted || hidden,
      disabled: record.deleted,
      icon: <FontAwesomeIcon className="text-red-500" icon={faTrash} />,
      tooltip: t("_pages:common.actions.delete.text"),
      onClick: () => onClick([record?.id]),
    }),
    [hidden, onClick, t]
  );

  return {
    action,
  };
};
