import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// types
import { ProductDto } from "lib";

// hook
import { UseSingleActionPropTypes } from "hooks";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const useDoMovementAction = (
  props: UseSingleActionPropTypes<number>
) => {
  const { t } = useTranslation();

  const { onClick, hidden = false } = props;

  const action = useCallback(
    (record: ProductDto) => ({
      id: "doMovement",
      hidden: record.deleted || hidden,
      disabled: record.deleted,
      icon: <FontAwesomeIcon className="text-primary" icon={faPlus} />,
      tooltip: t("_pages:products.forms.doMovement"),
      onClick: () => onClick(record?.id),
    }),
    [hidden, onClick, t]
  );

  return { action };
};
