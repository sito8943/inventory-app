import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// @sito/dashboard
import { TextInput, AutocompleteInput, Option } from "@sito/dashboard";

// components
import { FormContainer, ParagraphInput } from "components";

// hooks
import { useCategoriesCommon } from "hooks";

// types
import { ProductFormPropsType } from "../types";

// lib
import { Tables } from "lib";

export const ProductForm = (props: ProductFormPropsType) => {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const categories = useCategoriesCommon();

  const categoryOptions = useMemo(
    () => [...(categories?.data ?? [])] as Option[],
    [categories.data]
  );

  return (
    <FormContainer {...props}>
      <Controller
        control={control}
        render={({ field }) => <input {...field} type="hidden" />}
        name="id"
      />
      <div className="grid grid-cols-2 max-xs:grid-cols-1 gap-5">
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
              onChange={(v: Option) => onChange(v)}
              label={t("_entities:product.category.label")}
              {...rest}
            />
          )}
        />
      </div>

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
      <div className="grid grid-cols-3 max-xs:grid-cols-1 gap-5">
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
    </FormContainer>
  );
};
