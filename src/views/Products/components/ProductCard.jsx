import React from "react";
import { useTranslation } from "react-i18next";

// @emotion/css
import { css } from "@emotion/css";

// components
import Actions from "../../../components/Actions/Actions";

function ProductCard(props) {
  const { t } = useTranslation();

  const { id, onClick, actions, name, description, color, price, stock } =
    props;

  const styles = css({
    background: color,
  });

  return (
    <div className="flex flex-col justify-between items-start h-40 w-60 max-xs:w-full rounded-2xl p-3 group border-primary/30 hover:border-primary border-2 animated">
      <button
        className="cursor-pointer h-full w-full flex flex-col"
        name={t("_pages:products.forms.edit")}
        aria-label={t("_pages:products.forms.editAria")}
        onClick={() => onClick(id)}
      >
        <div className="flex items-center gap-2 justify-start">
          <span className={`${styles} w-3 h-3 rounded-full`}></span>
          <h3 className="text-white text-start">{name}</h3>
        </div>
        <div className="flex items-center gap-2 justify-start">
          <p className="!text-gray-400 text-xs">$ {price}</p>
          <p className="!text-gray-400 text-xs">
            {stock} {t("_pages:products.inputs.stock.label")}
          </p>
        </div>
        {description ? (
          <p className="text-start text-sm !text-gray-400">{description}</p>
        ) : (
          <p className="italic text-start !text-xs !text-gray-500">
            {t("_pages:products.inputs.description.empty")}
          </p>
        )}
      </button>

      <Actions actions={actions} />
    </div>
  );
}

export default ProductCard;
