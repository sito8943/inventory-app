import { useState, forwardRef, Ref } from "react";
import { useTranslation } from "react-i18next";
import { HexColorPicker } from "react-colorful";

// components
import { Dialog } from "components";

// icons
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @emotion/css
import { css } from "@emotion/css";

// hooks
import { useDialog } from "hooks";

// components
import TextInput from "./TextInput";

// types
import { ColorInputPropsTypes } from "./types.ts";

const ColorInput = forwardRef(function (
  props: ColorInputPropsTypes,
  ref: Ref<HTMLInputElement>,
) {
  const { onChange, value, ...rest } = props;

  const { t } = useTranslation();

  const [color, setColor] = useState(value ?? "#aabbcc");

  const styles = css({
    backgroundColor: value,
  });

  const dialogProps = useDialog();

  return (
    <>
      <TextInput
        {...rest}
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
      <Dialog
        className="!min-w-60"
        containerClassName="!z-20"
        title={t("_accessibility:labels.colorPicker")}
        {...dialogProps}
      >
        <HexColorPicker color={color} onChange={setColor} />
        <div className={`flex gap-2 mt-5 justify-end`}>
          <button
            type="button"
            onClick={() => {
              onChange(color);
              dialogProps.handleClose();
            }}
            className="button submit primary"
            name={t("_accessibility:buttons.submit")}
            aria-label={t("_accessibility:ariaLabels.insert")}
          >
            {t("_accessibility:buttons.submit")}
          </button>
          <button
            type="button"
            onClick={() => dialogProps.handleClose()}
            className="button outlined"
            name={t("_accessibility:buttons.cancel")}
            aria-label={t("_accessibility:ariaLabels.cancel")}
          >
            {t("_accessibility:buttons.cancel")}
          </button>
        </div>
      </Dialog>
    </>
  );
});

export default ColorInput;
