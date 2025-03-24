import { forwardRef } from "react";

const ParagraphInput = forwardRef(function (props, ref) {
  const {
    label,
    labelClassName,
    className,
    containerClassName,
    value,
    ...rest
  } = props;

  return (
    <div className={`flex flex-col ${containerClassName} relative`}>
      {!!label ? <label className={`${labelClassName}`}>{label}</label> : ""}
      <textarea
        ref={ref}
        value={value ?? ""}
        className={`input ${className}`}
        {...rest}
      ></textarea>
    </div>
  );
});

export default ParagraphInput;
