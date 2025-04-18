import React from "react";
import { useTranslation } from "react-i18next";

// @emotion/css
import { css } from "@emotion/css";

// components
import { Chip, Actions } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faDollar,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

function ProductCard(props) {
  const { t } = useTranslation();

  const {
    id,
    onClick,
    actions,
    name,
    description,
    color,
    categoryName,
    price,
    cost,
    stock,
  } = props;

  const styles = css({
    borderLeftColor: color,
    borderLeftWidth: "4px",
    borderLeftStyle: "solid",
  });

  return (
    <div
      className={`${styles} flex flex-col justify-between items-start h-52 w-60 max-xs:w-full rounded-2xl p-3 pb-1 group border-primary/30 hover:!border-primary border-2 animated`}
    >
      <button
        className="cursor-pointer h-full w-full flex flex-col gap-1"
        name={t("_pages:products.forms.edit")}
        aria-label={t("_pages:products.forms.editAria")}
        onClick={() => onClick(id)}
      >
        <h3 className="text-lg text-start !text-gray-200">{name}</h3>
        <p className="text-sm text-start">
          {description ?? t("_pages:products.inputs.description.empty")}
        </p>

        <Chip icon={faDollar} variant="none" className="!p-0">
          <p className="font-medium">
            {t("_pages:products.inputs.price.name")}:
          </p>
          <p className={!price ? "italic" : ""}>
            {price ? `$${price}` : t("_pages:products.inputs.price.empty")}
          </p>
        </Chip>
        <Chip icon={faCoins} variant="none" className="!p-0">
          <p className="font-medium">
            {t("_pages:products.inputs.cost.name")}:
          </p>
          <p className={!cost ? "italic" : ""}>
            {cost ? `${cost}` : t("_pages:products.inputs.cost.empty")}
          </p>
        </Chip>
        <Chip icon={faBoxArchive} variant="none" className="!p-0">
          <p className={stock ? "font-medium" : "italic"}>
            {stock ? (
              <>
                {t("_pages:products.inputs.stock.name")}:{" "}
                <span>
                  {`${stock} ${t("_pages:products.inputs.stock.units")}`}
                </span>
              </>
            ) : (
              t("_pages:products.inputs.stock.empty")
            )}
          </p>
        </Chip>
      </button>

      <Actions actions={actions} />
    </div>
  );
}

export default ProductCard;
