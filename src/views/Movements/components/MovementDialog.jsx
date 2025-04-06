import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";

export function MovementForm(props) {
  const { control } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        rules={{
          required: t("_pages:movements.inputs.name.required"),
        }}
        name="name"
        render={({ field }) => (
          <TextInput
            required
            maxLength={20}
            placeholder={t("_pages:movements.inputs.name.name")}
            {...field}
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
