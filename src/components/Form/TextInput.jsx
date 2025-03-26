import { forwardRef } from "react";

const TextInput = forwardRef(function (props, ref) {
  const {
    label,
    labelClassName,
    className,
    containerClassName,
    startAdornment,
    endAdornment,
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
        className={`input ${startAdornment ? "!pl-9" : ""} ${
          endAdornment ? "!pr-9" : ""
        } ${className}`}
        {...rest}
      />
      {endAdornment}
    </div>
  );
});

export default TextInput;
