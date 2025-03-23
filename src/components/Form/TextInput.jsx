function TextInput(props) {
  const {
    label,
    labelClassName,
    className,
    containerClassName,
    startAdornment,
  } = props;

  return (
    <div className={`flex flex-col ${containerClassName} relative`}>
      {!!label ? <label className={`${labelClassName}`}>{label}</label> : ""}
      {startAdornment}
      <input
        className={`input ${startAdornment ? "!pl-9" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}

export default TextInput;
