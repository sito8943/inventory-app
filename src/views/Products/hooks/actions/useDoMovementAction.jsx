import {useTranslation} from "react-i18next";

// icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function useDoMovementAction(props) {
    const {t} = useTranslation();

    const {onClick} = props;

    return (record) => ({
        id: "doMovement",
        hidden: !!record.deletedAt,
        disabled: !!record.deletedAt,
        icon: <FontAwesomeIcon className="text-primary" icon={faPlus}/>,
        tooltip: t("_pages:products.forms.doMovement"),
        onClick: () => onClick(record?.id),
    });
}

export default useDoMovementAction;
