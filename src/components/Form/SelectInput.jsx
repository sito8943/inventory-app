import { forwardRef, useEffect } from "react";

/**
 *
 * @param {object} props
 * @returns
 */
const SelectInput = forwardRef(function (props, ref) {
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
      onChange({ target: { value: options[0]?.id } });
  }, [onChange, options, value]);

  return (
    <div className={`relative flex flex-col ${containerClassName}`}>
      {!!label ? <label className={`${labelClassName}`}>{label}</label> : ""}
      {startAdornment}
      <select
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
            {option.value}
          </option>
        ))}
      </select>
      {endAdornment}
    </div>
  );
});

export default SelectInput;
