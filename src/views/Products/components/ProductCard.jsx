import React from "react";
import { useTranslation } from "react-i18next";

// @emotion/css
import { css } from "@emotion/css";

// components
import { Chip, Actions, ItemCard } from "../../../components";
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
    <ItemCard
      containerClassName={`${styles} hover:!border-primary !h-55`}
      title={name}
      name={t("_pages:products.forms.edit")}
      aria-label={t("_pages:products.forms.editAria")}
      onClick={() => onClick(id)}
      className="gap-2"
      actions={actions}
    >
      <p className="text-sm text-start">
        {description ?? t("_pages:products.inputs.description.empty")}
      </p>

      <Chip icon={faDollar} variant="none" className="!p-0">
        <p className="font-medium">{t("_pages:products.inputs.price.name")}:</p>
        <p className={!price ? "italic" : ""}>
          {price ? `$${price}` : t("_pages:products.inputs.price.empty")}
        </p>
      </Chip>
      <Chip icon={faCoins} variant="none" className="!p-0">
        <p className="font-medium">{t("_pages:products.inputs.cost.name")}:</p>
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

    </ItemCard>
  );
}

export default ProductCard;
