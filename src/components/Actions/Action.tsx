import { ActionPropsType } from "./types.ts";

export function Action(props: ActionPropsType) {
  const {
    id,
    hidden = false,
    disabled = false,
    icon,
    tooltip,
    onClick,
  } = props;

  return !hidden ? (
    <button
      id={id}
      className="action"
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
    >
      {icon}
    </button>
  ) : null;
}
