import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function AddCard(props) {
  const { ...rest } = props;

  return (
    <button
      className="h-40 w-40 rounded-2xl group border-primary/30 hover:border-primary border-dashed border-2 animated"
      {...rest}
    >
      <FontAwesomeIcon
        className="text-primary/30 group-hover:text-primary animated"
        icon={faAdd}
      />
    </button>
  );
}

export default AddCard;
