// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// types
import { AddCardPropsType } from "./types.js";

// styles
import "./styles.css";

export function AddCard(props: AddCardPropsType) {
  const { tooltip = "", ...rest } = props;

  return (
    <button
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
      className="add-card animated"
      {...rest}
    >
      <FontAwesomeIcon
        className="xs:text-xl text-white group-hover:text-black animated"
        icon={faAdd}
      />
    </button>
  );
}
