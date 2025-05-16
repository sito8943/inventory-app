import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faDolly } from "@fortawesome/free-solid-svg-icons";

// components
import { ItemCard } from "components";

// types
import { MovementCardPropsType } from "../types";
import { types } from "../../../db/types/products.ts";

export const icons = {
  1: faBoxArchive,
  2: faDolly,
};

function MovementCard(props: MovementCardPropsType) {
  const { t } = useTranslation();

  const { id, onClick, actions, name, type } = props;

  const renderType = useMemo(
    () => types.find((ty) => ty.id === type) ?? types[0],
    [type],
  );

  const icon = useMemo(
    () => icons[renderType?.id as keyof typeof icons],
    [renderType?.id],
  );

  return (
    <ItemCard
      title={name}
      name={t("_pages:movements.forms.edit")}
      aria-label={t("_pages:movements.forms.editAria")}
      onClick={() => onClick(id)}
      actions={actions}
    >
      <div className="flex gap-2 items-center">
        {icon && (
          <FontAwesomeIcon className="text-primary text-xl" icon={icon} />
        )}
        <p>{t(`_pages:movements.inputs.type.${renderType?.label}`)}</p>
      </div>
    </ItemCard>
  );
}

export default MovementCard;
