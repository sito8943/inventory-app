import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function AddCard(props) {
  const { ...rest } = props;

  return (
    <button
      className="h-40 w-40 max-xs:h-10 max-xs:w-10 rounded-2xl max-xs:rounded-full max-xs:fixed max-xs:bottom-3 max-xs:right-3 group max-xs:bg-primary/30 hover:bg-primary border-primary/30 hover:border-primary border-dashed max-xs:border-0 border-2 animated"
      {...rest}
    >
      <FontAwesomeIcon
        className="text-primary/30 max-xs:text-white group-hover:text-primary max-xs:group-hover:text-black animated"
        icon={faAdd}
      />
    </button>
  );
}

export default AddCard;
