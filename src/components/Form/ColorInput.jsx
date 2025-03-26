import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, forwardRef } from "react";

// @emotion/css
import { css } from "@emotion/css";

// components
import TextInput from "./TextInput";

const ColorInput = forwardRef(function (props, ref) {
  const [showDialog, setShowDialog] = useState();

  const { value } = props;

  const styles = css({
    backgroundColor: value,
  });

  return (
    <TextInput
      {...props}
      ref={ref}
      startAdornment={
        <button
          onClick={() => setShowDialog(true)}
          type="button"
          className="icon-button border-border border-2 absolute left-1 top-[50%] -translate-y-[50%]"
        >
          <FontAwesomeIcon icon={faEyeDropper} className="text-white text-sm" />
        </button>
      }
      endAdornment={
        <span
          className={`rounded-full absolute right-1 top-[50%] -translate-y-[50%] w-5 h-5 ${styles}`}
        ></span>
      }
    />
  );
});

export default ColorInput;
