import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// @sito/dashboard
import { TextInput, AutocompleteInput, Option } from "@sito/dashboard";

// components
import { FormDialog, ParagraphInput } from "components";

// hooks
import { useCategoriesCommon } from "hooks";

// types
import {
  AddProductDialogPropsType,
  EditProductDialogPropsType,
  ProductFormPropsType,
} from "../types";
import { Tables } from "../../../db/types";

export const ProductForm = (props: ProductFormPropsType) => {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const categories = useCategoriesCommon();

  const categoryOptions = useMemo(
    () => [...(categories?.data ?? [])] as Option[],
    [categories.data]
  );

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
          required: t("_entities:product.name.required"),
        }}
        name="name"
        disabled={isLoading || categories?.isLoading}
        render={({ field }) => (
          <TextInput
            required
            maxLength={25}
            autoComplete={`${Tables.Products}-${t("_entities:product.name.label")}}`}
            label={t("_entities:product.name.label")}
            placeholder={t("_entities:product.name.placeholder")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="categories"
        disabled={isLoading || categories?.isLoading}
        render={({ field: { value, onChange, ...rest } }) => (
          <AutocompleteInput
            options={categoryOptions}
            value={value as unknown as Option[]}
            multiple
            onChange={(v) => onChange(v)}
            label={t("_entities:product.category.label")}
            {...rest}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        disabled={isLoading || categories?.isLoading}
        render={({ field }) => (
          <ParagraphInput
            maxLength={60}
            autoComplete={`${Tables.Products}-${t("_entities:product.description.label")}}`}
            label={t("_entities:product.description.label")}
            placeholder={t("_entities:product.description.placeholder")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="price"
        disabled={isLoading || categories?.isLoading}
        render={({ field }) => (
          <TextInput
            type="number"
            label={t("_entities:product.price.label")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="cost"
        disabled={isLoading || categories?.isLoading}
        render={({ field }) => (
          <TextInput
            type="number"
            label={t("_entities:product.cost.label")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="stock"
        disabled={isLoading || categories?.isLoading}
        render={({ field }) => (
          <TextInput
            type="number"
            label={t("_entities:product.stock.label")}
            {...field}
          />
        )}
      />
    </div>
  );
};

export function AddProductDialog(props: AddProductDialogPropsType) {
  return (
    <FormDialog {...props}>
      <ProductForm {...props} />
    </FormDialog>
  );
}

export function EditProductDialog(props: EditProductDialogPropsType) {
  return (
    <FormDialog {...props}>
      <ProductForm {...props} />
    </FormDialog>
  );
}
