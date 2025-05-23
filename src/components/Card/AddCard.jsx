import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function AddCard(props) {
  const { onClick, tooltip = "", ...rest } = props;

  return (
    <button
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
      className="flex items-center justify-center h-14 w-14 max-xs:h-10 max-xs:w-10 rounded-full fixed bottom-3 right-3 group bg-primary/30 hover:bg-primary border-primary/30 hover:border-primary animated"
      onClick={() => onClick()}
      {...rest}
    >
      <FontAwesomeIcon
        className="xs:text-xl text-white group-hover:text-black animated"
        icon={faAdd}
      />
    </button>
  );
}

export default AddCard;
