import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faDolly } from "@fortawesome/free-solid-svg-icons";

// components
import { ItemCard } from "components";

// types
import { MovementCardPropsType } from "../types";
import { MovementType, enumToKeyValueArray } from "lib";

const types = enumToKeyValueArray(MovementType);

export const icons = {
  1: faBoxArchive,
  2: faDolly,
};

function MovementCard(props: MovementCardPropsType) {
  const { t } = useTranslation();

  const { id, onClick, actions, name, type } = props;

  const renderType = useMemo(
    () => types.find((ty) => ty.value === type) ?? types[0],
    [type],
  );

  const icon = useMemo(
    () => icons[renderType?.value as keyof typeof icons],
    [renderType?.value],
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
        <p>{t(`_pages:movements.inputs.type.${renderType?.key}`)}</p>
      </div>
    </ItemCard>
  );
}

export default MovementCard;
