import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

// types
import { UseMultipleActionPropTypes } from "hooks";
import { BaseEntityDto } from "lib";

export const useRestoreAction = (props: UseMultipleActionPropTypes<number>) => {
  const { t } = useTranslation();

  const { onClick, hidden = false } = props;

  return (record: BaseEntityDto) => ({
    id: "restore",
    hidden: !record.deleted || hidden,
    disabled: !record.deleted,
    icon: <FontAwesomeIcon className="text-red-500" icon={faRotateLeft} />,
    tooltip: t("_pages:common.actions.restore.text"),
    onClick: () => onClick([record?.id]),
  });
};
