import { useMemo } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faDolly } from "@fortawesome/free-solid-svg-icons";

// components
import Actions from "../../../components/Actions/Actions";

// types
import { types } from "../../../db/types/products";

const icons = {
  1: faBoxArchive,
  2: faDolly,
};

function MovementCard(props) {
  const { t } = useTranslation();

  const { id, onClick, actions, name, type } = props;

  const renderType = useMemo(() => types.find((ty) => ty.id === type), [type]);

  return (
    <div className="flex flex-col justify-between items-start h-40 w-60 max-xs:w-full rounded-2xl p-3 group border-primary/30 hover:border-primary border-2 animated">
      <button
        className="cursor-pointer h-full w-full flex flex-col justify-start items-start"
        name=""
        aria-label=""
        onClick={() => onClick(id)}
      >
        <div className="flex flex-col items-center gap-2 justify-start">
          <h3 className="text-xl text-white text-start">{name}</h3>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon className="text-primary text-xl" icon={icons[renderType?.id]} />
            <p>{t(`_pages:movements.inputs.type.${renderType?.label}`)}</p>
          </div>
        </div>
      </button>

      <Actions actions={actions} />
    </div>
  );
}

export default MovementCard;
