import { forwardRef } from "react";

const TextInput = forwardRef(function (props, ref) {
  const {
    label,
    labelClassName,
    className,
    containerClassName,
    startAdornment,
    value,
    ...rest
  } = props;

  return (
    <div className={`flex flex-col ${containerClassName} relative`}>
      {!!label ? <label className={`${labelClassName}`}>{label}</label> : ""}
      {startAdornment}
      <input
        ref={ref}
        value={value ?? ""}
        className={`input ${startAdornment ? "!pl-9" : ""} ${className}`}
        {...rest}
      />
    </div>
  );
});

export default TextInput;
