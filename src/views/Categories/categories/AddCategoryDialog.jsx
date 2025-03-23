import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import AddDialog from "../../../components/Dialog/AddDialog";
import TextInput from "../../../components/Form/TextInput";
import ColorInput from "../../../components/Form/ColorInput";

export function AddCategoryForm(props) {
  const { control } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        rules={{
          required: t("_pages:categories.inputs.name.required"),
        }}
        name={t("_pages:categories.inputs.name.name")}
        render={(field) => (
          <TextInput
            required
            placeholder={t("_pages:categories.inputs.name.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: t("_pages:categories.inputs.name.required"),
        }}
        name={t("_pages:categories.inputs.color.name")}
        render={(field) => (
          <ColorInput
            required
            placeholder={t("_pages:categories.inputs.color.name")}
            {...field}
          />
        )}
      />
    </div>
  );
}

export default function AddCategoryDialog(props) {
  return (
    <AddDialog {...props.dialogProps}>
      <AddCategoryForm {...props.formProps} />
    </AddDialog>
  );
}
