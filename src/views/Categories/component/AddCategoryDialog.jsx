import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import AddDialog from "../../../components/Dialog/AddDialog";
import TextInput from "../../../components/Form/TextInput";
import ColorInput from "../../../components/Form/ColorInput";
import ParagraphInput from "../../../components/Form/ParagraphInput";

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
        name="name"
        render={({ field }) => (
          <TextInput
            required
            placeholder={t("_pages:categories.inputs.name.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <ParagraphInput
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

export default function AddCategoryDialog(props) {
  return (
    <AddDialog {...props}>
      <AddCategoryForm {...props} />
    </AddDialog>
  );
}
