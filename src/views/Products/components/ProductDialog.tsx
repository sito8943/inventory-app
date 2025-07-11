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
          required: t("_pages:products.inputs.name.required"),
        }}
        name="name"
        disabled={isLoading || categories?.isLoading}
        render={({ field }) => (
          <TextInput
            required
            maxLength={25}
            autoComplete={`${Tables.Products}-${t("_pages:products.inputs.name.name")}}`}
            placeholder={t("_pages:products.inputs.name.name")}
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
            placeholder={t("_pages:products.inputs.category.name")}
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
            autoComplete={`${Tables.Products}-${t("_pages:products.inputs.description.name")}}`}
            placeholder={t("_pages:products.inputs.description.name")}
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
            placeholder={t("_pages:products.inputs.price.name")}
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
            placeholder={t("_pages:products.inputs.cost.name")}
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
            placeholder={t("_pages:products.inputs.stock.name")}
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
