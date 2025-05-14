import { forwardRef, Ref } from "react";

// types
import { TextInputPropsType } from "./types.ts";

const ParagraphInput = forwardRef(function (
  props: TextInputPropsType,
  ref: Ref<HTMLTextAreaElement>,
) {
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
        /*@ts-ignore*/
        ref={ref}
        value={value ?? ""}
        className={`input ${className}`}
        {...rest}
      ></textarea>
    </div>
  );
});

export default ParagraphInput;
