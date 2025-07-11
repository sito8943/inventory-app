import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// @sito/dashboard
import { TextInput, SelectInput } from "@sito/dashboard";

// components
import { FormDialog } from "components";

// hooks
import { useMovementsCommon } from "hooks";

// types
import { DoMovementDialogPropsType, DoMovementFormPropsType } from "../types";

export function DoMovementForm(props: DoMovementFormPropsType) {
  const { control, isLoading, product, setValue } = props;
  const { t } = useTranslation();

  const movements = useMovementsCommon();

  const movementOptions = useMemo(
    () => [...(movements?.data ?? [])],
    [movements.data]
  );

  useEffect(() => {
    if (product && setValue) setValue("product", product);
  }, [product, setValue]);

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        render={({ field }) => <input {...field} type="hidden" />}
        name="product"
      />
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
            label={t("_entities:movementLog.movement.label")}
            {...rest}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: t("_entities:movementLog.count.required"),
        }}
        name="count"
        disabled={isLoading || movements?.isLoading}
        render={({ field }) => (
          <TextInput
            required
            type="number"
            maxLength={25}
            label={t("_entities:movementLog.count.label")}
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
