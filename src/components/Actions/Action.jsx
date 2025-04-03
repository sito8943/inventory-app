function Action(props) {
  const { hidden, disabled, icon, tooltip, onClick } = props;

  return !hidden ? (
    <button
      className="action"
      disabled={disabled}
      onClick={onClick}
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
    >
      {icon}
    </button>
  ) : null;
}

export default Action;
