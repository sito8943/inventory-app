function Action(props) {
  const { hidden, disabled, icon, tooltip, onClick } = props;

  return !hidden ? (
    <button className="action" disabled={disabled} onClick={onClick}>
      {icon}
    </button>
  ) : null;
}

export default Action;
