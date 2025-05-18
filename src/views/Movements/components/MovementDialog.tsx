import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useWatch } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { FormDialog, TextInput, SelectInput } from "components";

// utils
import { icons } from "./MovementCard.jsx";
import { enumToKeyValueArray } from "../../../lib/utils";

// types
import { MovementType } from "lib";
import {
  AddMovementDialogPropsType,
  EditMovementDialogPropsType,
  MovementFormPropsType,
} from "../types";

export function MovementForm(props: MovementFormPropsType) {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const typeOptions = useMemo(
    () => [
      ...(enumToKeyValueArray(MovementType)?.map(({ key, value }) => ({
        id: value as number,
        name: key,
      })) ?? []),
    ],
    [],
  );

  const { type } = useWatch({ control });

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        render={({ field }) => <input {...field} type="hidden" />}
        name="id"
      />
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
                icon={icons[(type ?? 0) as keyof typeof icons]}
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

export function AddMovementDialog(props: AddMovementDialogPropsType) {
  return (
    <FormDialog {...props}>
      <MovementForm {...props} />
    </FormDialog>
  );
}

export function EditMovementDialog(props: EditMovementDialogPropsType) {
  return (
    <FormDialog {...props}>
      <MovementForm {...props} />
    </FormDialog>
  );
}
