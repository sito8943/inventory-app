import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import { FormDialog, TextInput, ColorInput, ParagraphInput } from "components";

// types
import {
  AddCategoryDialogPropsType,
  CategoryFormPropsType,
  EditCategoryDialogPropsType,
} from "../types";

export function CategoryForm(props: CategoryFormPropsType) {
  const { control, isLoading } = props;
  const { t } = useTranslation();

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
          required: `t("_pages:categories.inputs.name.required")`,
        }}
        name="name"
        disabled={isLoading}
        render={({ field: { value, ...rest } }) => (
          <TextInput
            required
            maxLength={20}
            value={value ?? ""}
            placeholder={t("_pages:categories.inputs.name.name")}
            {...rest}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        disabled={isLoading}
        render={({ field: { value, ...rest } }) => (
          <ParagraphInput
            maxLength={60}
            value={value ?? ""}
            placeholder={t("_pages:categories.inputs.description.name")}
            {...rest}
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
        render={({ field: { value, onChange, ...rest } }) => (
          <ColorInput
            required
            value={value ?? ""}
            onChange={onChange}
            placeholder={t("_pages:categories.inputs.color.name")}
            {...rest}
          />
        )}
      />
    </div>
  );
}

export function AddCategoryDialog(props: AddCategoryDialogPropsType) {
  return (
    <FormDialog {...props}>
      <CategoryForm {...props} />
    </FormDialog>
  );
}

export function EditCategoryDialog(props: EditCategoryDialogPropsType) {
  return (
    <FormDialog {...props}>
      <CategoryForm {...props} />
    </FormDialog>
  );
}
