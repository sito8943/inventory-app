import { useState, forwardRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HexColorPicker } from "react-colorful";

// components
import FormDialog from "../Dialog/FormDialog";

// icons
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @emotion/css
import { css } from "@emotion/css";

// hooks
import useDialog from "../../hooks/useDialog";

// components
import TextInput from "./TextInput";

const ColorInput = forwardRef(function (props, ref) {
  const { onChange, value, ...rest } = props;

  const { t } = useTranslation();

  const [color, setColor] = useState("#aabbcc");

  useEffect(() => {
    setColor(value);
  }, [value]);

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
      <FormDialog
        className="!min-w-60"
        containerClassName="!z-20"
        handleSubmit={(e) => {
          dialogProps.handleClose();
          onChange(color);
          e.preventDefault();
          e.stopPropagation();
        }}
        title={t("_accessibility:labels.colorPicker")}
        {...dialogProps}
      >
        <HexColorPicker color={color} onChange={setColor} />
      </FormDialog>
    </>
  );
});

export default ColorInput;
