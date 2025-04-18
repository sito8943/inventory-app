import { useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

// providers
import { useManager } from "../../../providers/ManagerProvider";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";
import ParagraphInput from "../../../components/Form/ParagraphInput";

// utils
import { ReactQueryKeys } from "../../../utils/queryKey";

export const ProductForm = (props) => {
  const { control, isLoading } = props;
  const { t } = useTranslation();

  const manager = useManager();

  const categories = useQuery({
    queryKey: [ReactQueryKeys.Categories],
    enabled: true,
    queryFn: () =>
      manager.Categories.get({ deletedAt: null }, "id,name as value"),
  });

  const categoryOptions = useMemo(
    () => [...(categories?.data ?? [])],
    [categories.data],
  );

  return (
    <div className="flex flex-col gap-5">
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
            placeholder={t("_pages:products.inputs.name.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          invalid: t("_pages:products.inputs.category.invalid"),
        }}
        name="category"
        disabled={isLoading || categories?.isLoading}
        render={({ field: { value, onChange, ...rest } }) => (
          <SelectInput
            required
            options={categoryOptions}
            value={value}
            onChange={(e) => onChange(e.target.value)}
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

export function AddProductDialog(props) {
  return (
    <FormDialog {...props}>
      <ProductForm {...props} />
    </FormDialog>
  );
}

export function EditProductDialog(props) {
  return (
    <FormDialog {...props}>
      <ProductForm {...props} />
    </FormDialog>
  );
}
