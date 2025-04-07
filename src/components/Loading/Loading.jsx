import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Loading(props) {
  const { color = "text-primary", size = "text-xl", className = "" } = props;

  return (
    <div>
      <FontAwesomeIcon
        className={`rotate ${color} ${size} ${className}`}
        icon={faCircleNotch}
      />
    </div>
  );
}

export default Loading;
