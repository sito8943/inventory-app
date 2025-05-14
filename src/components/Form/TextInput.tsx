import { forwardRef, Ref } from "react";

// types
import { TextInputPropsType } from "./types.ts";

const TextInput = forwardRef(function (
  props: TextInputPropsType,
  ref: Ref<HTMLInputElement>,
) {
  const {
    children,
    label = "",
    labelClassName = "",
    className = "",
    containerClassName = "",
    startAdornment,
    endAdornment,
    value,
    error,
    ...rest
  } = props;

  return (
    <div className={`flex flex-col ${containerClassName} relative`}>
      {!!label ? <label className={`${labelClassName}`}>{label}</label> : ""}
      {startAdornment}
      <input
        ref={ref}
        value={value ?? ""}
        className={`input ${error ? "!border-red-500" : ""} ${
          startAdornment ? "!pl-9" : ""
        } ${endAdornment ? "!pr-9" : ""} ${className}`}
        {...rest}
      />
      {endAdornment}
      {children}
    </div>
  );
});

export default TextInput;
