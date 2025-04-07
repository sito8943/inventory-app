import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";

// types
import { types } from "../../../db/types/products";

export function MovementForm(props) {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const typeOptions = useMemo(() => {
    return [
      { id: 0, value: t("_pages:movements.inputs.type.name") },
      ...(types?.data ?? []),
    ];
  }, []);

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
