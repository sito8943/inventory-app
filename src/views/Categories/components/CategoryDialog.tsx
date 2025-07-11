import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// @sito/dashboard
import { TextInput } from "@sito/dashboard";

// components
import { FormDialog, ParagraphInput } from "components";

// types
import {
  AddCategoryDialogPropsType,
  CategoryFormPropsType,
  EditCategoryDialogPropsType,
} from "../types";
import { Tables } from "../../../db/types";

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
          required: `t("_entities:category.name.required")`,
        }}
        name="name"
        disabled={isLoading}
        render={({ field: { value, ...rest } }) => (
          <TextInput
            required
            maxLength={20}
            value={value ?? ""}
            autoComplete={`${Tables.Categories}-${t("_entities:category.name.label")}}`}
            placeholder={t("_entities:category.name.label")}
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
            autoComplete={`${Tables.Categories}-${t("_entities:category.description.label")}}`}
            placeholder={t("_entities:category.description.label")}
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
