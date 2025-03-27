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
    containerClassName,
    inputClassName,
    labelClassName,
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
        value={value ?? ""}
        className={`input ${startAdornment ? "!pl-9" : ""} ${
          endAdornment ? "!pr-9" : ""
        } ${className}`}
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
