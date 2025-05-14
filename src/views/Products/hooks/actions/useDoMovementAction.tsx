import { useTranslation } from "react-i18next";

// types
import { ProductDto } from "lib";
import { ActionPropsType } from "components";
import { UseSingleActionPropTypes } from "hooks";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const useDoMovementAction = (
  props: UseSingleActionPropTypes<number>,
): ((record: ProductDto) => ActionPropsType) => {
  const { t } = useTranslation();

  const { onClick, hidden = false } = props;

  return (record: ProductDto) => ({
    id: "doMovement",
    hidden: !!record.deletedAt || hidden,
    disabled: !!record.deletedAt,
    icon: <FontAwesomeIcon className="text-primary" icon={faPlus} />,
    tooltip: t("_pages:products.forms.doMovement"),
    onClick: () => onClick(record?.id),
  });
};
