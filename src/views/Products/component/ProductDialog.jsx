import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";
import ColorInput from "../../../components/Form/ColorInput";
import ParagraphInput from "../../../components/Form/ParagraphInput";

export function ProductForm(props) {
  const { control } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={control}
        rules={{
          required: t("_pages:products.inputs.name.required"),
        }}
        name="name"
        render={({ field }) => (
          <TextInput
            required
            maxLength={20}
            placeholder={t("_pages:products.inputs.name.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
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
        rules={{
          required: t("_pages:products.inputs.price.required"),
        }}
        name="price"
        render={({ field }) => (
          <TextInput
            required
            type="number"
            placeholder={t("_pages:products.inputs.price.name")}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: t("_pages:products.inputs.stock.required"),
        }}
        name="stock"
        render={({ field }) => (
          <TextInput
            required
            type="number"
            placeholder={t("_pages:products.inputs.stock.name")}
            {...field}
          />
        )}
      />
    </div>
  );
}

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
