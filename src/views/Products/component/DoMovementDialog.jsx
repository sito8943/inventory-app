import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

// providers
import { useManager } from "../../../providers/ManagerProvider";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

function DoMovementForm(props) {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const manager = useManager();

  const movements = useQuery({
    queryKey: [ReactQueryKeys.Movements],
    enabled: true,
    queryFn: () =>
      manager.Movements.get({ deletedAt: null }, "id,name as value"),
  });

  const movementOptions = useMemo(() => {
    return [
      { id: 0, value: t("_pages:products.inputs.movement.name") },
      ...(movements?.data ?? []),
    ];
  }, [movements.data]);

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        rules={{
          invalid: t("_pages:products.inputs.movement.invalid"),
        }}
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

export function DoMovementDialog(props) {
  return (
    <FormDialog {...props}>
      <DoMovementForm {...props} />
    </FormDialog>
  );
}
