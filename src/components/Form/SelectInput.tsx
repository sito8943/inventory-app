import { ChangeEvent, forwardRef, Ref, useEffect } from "react";

// types
import { SelectInputPropsTypes } from "./types.ts";

/**
 *
 * @param {object} props
 * @returns
 */
const SelectInput = forwardRef(function (
  props: SelectInputPropsTypes,
  ref: Ref<HTMLSelectElement>,
) {
  const {
    value,
    onChange,
    options,
    label,
    className = "",
    containerClassName = "",
    labelClassName = "",
    startAdornment,
    endAdornment,
    error,
    ...rest
  } = props;

  // setting default value
  useEffect(() => {
    if ((!value || value === "") && options?.length)
      onChange({
        target: { value: options[0]?.id },
      } as unknown as ChangeEvent<HTMLSelectElement>);
  }, [onChange, options, value]);

  return (
    <div className={`relative flex flex-col ${containerClassName}`}>
      {!!label ? <label className={`${labelClassName}`}>{label}</label> : ""}
      {startAdornment}
      <select
        /*@ts-ignore*/
        ref={ref}
        onChange={onChange}
        value={value ?? ""}
        className={`input ${error ? "!border-red-500" : ""} ${
          startAdornment ? "!pl-9" : ""
        } ${endAdornment ? "!pr-9" : ""} ${className}`}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {endAdornment}
    </div>
  );
});

export default SelectInput;
