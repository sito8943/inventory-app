import { ForwardedRef, forwardRef } from "react";

// @sito/dashboard
import {
  labelStateClassName,
  inputStateClassName,
  helperTextStateClassName,
  State,
} from "@sito/dashboard";

// types
import { ParagraphInputPropsType } from "./types";

/**
 * ParagraphInput
 * @param {object} props
 * @returns ParagraphInput Component
 */
export const ParagraphInput = forwardRef(function (
  props: ParagraphInputPropsType,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const {
    value,
    onChange,
    state = State.default,
    name = "",
    id = "",
    label = "",
    disabled = false,
    required = false,
    placeholder = "",
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperText = "",
    helperTextClassName = "",
    ...rest
  } = props;

  return (
    <div
      className={`relative z-0 w-full mb-5 group h-80 ${containerClassName}`}
    >
      <textarea
        ref={ref}
        name={name}
        id={id}
        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${inputStateClassName(state)} ${inputClassName} peer`}
        placeholder=""
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      ></textarea>
      <label
        htmlFor={name}
        className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 ${labelStateClassName(state)} ${labelClassName}`}
      >
        {label}
        {required ? " *" : ""}
      </label>
      <p
        className={`mt-2 text-sm ${helperTextStateClassName(state)} ${helperTextClassName}`}
      >
        {state !== "error" && state !== "good" ? placeholder : helperText}
      </p>
    </div>
  );
});
