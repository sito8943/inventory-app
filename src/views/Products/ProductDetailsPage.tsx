import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// components
import { Page } from "components";
import { ProductForm } from "./components";

// hooks
import { useProductForm } from "./hooks";

export function ProductDetailsPage() {
  const { id = 0 } = useParams();

  const { t } = useTranslation();

  const productForm = useProductForm({ id: Number(id) });

  return (
    <Page title={t(`_pages:products.title`)} isLoading={productForm.isLoading}>
      <ProductForm {...productForm} />
    </Page>
  );
}
