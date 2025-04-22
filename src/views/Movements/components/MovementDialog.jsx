import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useWatch } from "react-hook-form";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";

// types
import { types } from "../../../db/types/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// utils
import { icons } from "./MovementCard.jsx";

export function MovementForm(props) {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const typeOptions = useMemo(
    () => [...(types?.map(({ id, label }) => ({ id, value: label })) ?? [])],
    [],
  );

  const { type } = useWatch({ control });

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        rules={{
          required: t("_pages:movements.inputs.name.required"),
        }}
        name="name"
        disabled={isLoading}
        render={({ field }) => (
          <TextInput
            required
            maxLength={20}
            placeholder={t("_pages:movements.inputs.name.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          invalid: t("_pages:movements.inputs.type.invalid"),
        }}
        name="type"
        disabled={isLoading}
        render={({ field: { value, onChange, ...rest } }) => (
          <SelectInput
            required
            options={typeOptions}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            startAdornment={
              <FontAwesomeIcon
                icon={icons[type ?? 0]}
                className=" ml-2 border-border border-2 absolute left-1 top-[50%] -translate-y-[50%] text-white text-sm"
              />
            }
            placeholder={t("_pages:movements.inputs.type.name")}
            {...rest}
          />
        )}
      />
    </div>
  );
}

export function AddMovementDialog(props) {
  return (
    <FormDialog {...props}>
      <MovementForm {...props} />
    </FormDialog>
  );
}

export function EditMovementDialog(props) {
  return (
    <FormDialog {...props}>
      <MovementForm {...props} />
    </FormDialog>
  );
}
