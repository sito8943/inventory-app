import {useMemo} from "react";
import {useTranslation} from "react-i18next";

// icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxArchive, faDolly} from "@fortawesome/free-solid-svg-icons";

// components
import ItemCard from "../../../components/Card/ItemCard";

// types
import {types} from "../../../db/types/products";

const icons = {
    1: faBoxArchive,
    2: faDolly,
};

function MovementCard(props) {
    const {t} = useTranslation();

    const {id, onClick, actions, name, type} = props;

    const renderType = useMemo(() => types.find((ty) => ty.id === type), [type]);

    return (
        <ItemCard
            title={name}
            name={t("_pages:movements.forms.edit")}
            aria-label={t("_pages:movements.forms.editAria")}
            onClick={() => onClick(id)}
            actions={actions}
        >
            <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                    className="text-primary text-xl"
                    icon={icons[renderType?.id]}
                />
                <p>{t(`_pages:movements.inputs.type.${renderType?.label}`)}</p>
            </div>
        </ItemCard>
    );
}

export default MovementCard;
