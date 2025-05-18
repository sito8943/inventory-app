// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// types
import { AddCardPropsType } from "./types.js";

export function AddCard(props: AddCardPropsType) {
  const { tooltip = "", ...rest } = props;

  return (
    <button
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
      className="flex items-center justify-center h-14 w-14 max-xs:h-10 max-xs:w-10 rounded-full fixed bottom-3 right-3 group bg-bg-primary hover:bg-hover-primary border-bg-primary hover:border-hover-primary animated"
      {...rest}
    >
      <FontAwesomeIcon
        className="xs:text-xl text-white group-hover:text-black animated"
        icon={faAdd}
      />
    </button>
  );
}
