import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import { FormDialog, SelectInput, TextInput } from "../../../components";

// hooks
import { useMovementsCommon } from "hooks";

// types
import { DoMovementDialogPropsType, DoMovementFormPropsType } from "./types.ts";

function DoMovementForm(props: DoMovementFormPropsType) {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const movements = useMovementsCommon();

  const movementOptions = useMemo(
    () => [
      ...(movements?.data?.map(({ id, name }) => ({ id, value: name })) ?? []),
    ],
    [movements.data],
  );

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        name="movement"
        disabled={isLoading || movements?.isLoading}
        render={({ field: { value, onChange, ...rest } }) => (
          <SelectInput
            required
            options={movementOptions}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t("_pages:products.inputs.movement.name")}
            {...rest}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: t("_pages:products.inputs.count.required"),
        }}
        name="count"
        disabled={isLoading || movements?.isLoading}
        render={({ field }) => (
          <TextInput
            required
            type="number"
            maxLength={25}
            placeholder={t("_pages:products.inputs.count.name")}
            {...field}
          />
        )}
      />
    </div>
  );
}

export function DoMovementDialog(props: DoMovementDialogPropsType) {
  return (
    <FormDialog {...props}>
      <DoMovementForm {...props} />
    </FormDialog>
  );
}
