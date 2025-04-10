import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";
import ColorInput from "../../../components/Form/ColorInput";
import ParagraphInput from "../../../components/Form/ParagraphInput";

export function CategoryForm(props) {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        rules={{
          required: t("_pages:categories.inputs.name.required"),
        }}
        name="name"
        disabled={isLoading}
        render={({ field }) => (
          <TextInput
            required
            maxLength={20}
            placeholder={t("_pages:categories.inputs.name.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        disabled={isLoading}
        render={({ field }) => (
          <ParagraphInput
            maxLength={60}
            placeholder={t("_pages:categories.inputs.description.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: t("_pages:categories.inputs.name.required"),
        }}
        name="color"
        disabled={isLoading}
        render={({ field }) => (
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

export function AddCategoryDialog(props) {
  return (
    <FormDialog {...props}>
      <CategoryForm {...props} />
    </FormDialog>
  );
}

export function EditCategoryDialog(props) {
  return (
    <FormDialog {...props}>
      <CategoryForm {...props} />
    </FormDialog>
  );
}
