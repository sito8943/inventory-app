import React from "react";
import { useTranslation } from "react-i18next";

function Categories() {
  const { t } = useTranslation();

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:products.title")}</h2>
      </div>
    </main>
  );
}

export default Categories;
