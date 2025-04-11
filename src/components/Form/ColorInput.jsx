import { useState, forwardRef } from "react";
import { SketchPicker } from "react-color";
import { useTranslation } from "react-i18next";

// icons
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @emotion/css
import { css } from "@emotion/css";

// hooks
import useDialog from "../../hooks/useDialog";

// components
import Dialog from "../Dialog/Dialog";
import TextInput from "./TextInput";

const ColorInput = forwardRef(function (props, ref) {
  const { t } = useTranslation();

  const { value } = props;

  const styles = css({
    backgroundColor: value,
  });

  const dialogProps = useDialog();

  return (
    <>
      <TextInput
        {...props}
        ref={ref}
        startAdornment={
          <button
            onClick={() => dialogProps.handleOpen()}
            type="button"
            className="icon-button border-border border-2 absolute left-1 top-[50%] -translate-y-[50%]"
          >
            <FontAwesomeIcon
              icon={faEyeDropper}
              className="text-white text-sm"
            />
          </button>
        }
        endAdornment={
          <span
            className={`rounded-full absolute right-2 top-[50%] -translate-y-[50%] w-4 h-4 ${styles}`}
          ></span>
        }
      />
      <Dialog {...dialogProps} containerClassName={"!z-20"}>
        <SketchPicker />
      </Dialog>
    </>
  );
});

export default ColorInput;
