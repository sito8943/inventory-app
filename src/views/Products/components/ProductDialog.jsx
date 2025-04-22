import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Controller} from "react-hook-form";

// components
import FormDialog from "../../../components/Dialog/FormDialog";
import TextInput from "../../../components/Form/TextInput";
import SelectInput from "../../../components/Form/SelectInput";
import ParagraphInput from "../../../components/Form/ParagraphInput";

// utils
import {useCategoriesCommon} from "../../../hooks/queries/useCategories.jsx";

export const ProductForm = (props) => {
    const {control, isLoading} = props;
    const {t} = useTranslation();

    const categories = useCategoriesCommon();

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
                render={({field}) => (
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
                render={({field: {value, onChange, ...rest}}) => (
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
                render={({field}) => (
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
                render={({field}) => (
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
                render={({field}) => (
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
                render={({field}) => (
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
