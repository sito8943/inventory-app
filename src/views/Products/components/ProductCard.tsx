import { useTranslation } from "react-i18next";

// components
import { Chip, ItemCard } from "components";

// icons
import {
  faBoxArchive,
  faCoins,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";

// types
import { ProductCardPropsType } from "../types";

function ProductCard(props: ProductCardPropsType) {
  const { t } = useTranslation();

  const { id, onClick, actions, name, price, cost, stock, deleted } = props;

  return (
    <ItemCard
      containerClassName="hover:!border-primary !h-55"
      title={name}
      name={t("_pages:products.forms.edit")}
      aria-label={t("_pages:products.forms.editAria")}
      onClick={() => onClick(id)}
      className="gap-2"
      actions={actions}
      deleted={deleted}
    >
      <Chip icon={faDollar} variant="none" className="!p-0">
        <p className="font-medium">{t("_entities:product.price.label")}:</p>
        <p className={!price ? "italic" : ""}>
          {price ? `$${price}` : t("_entities:product.price.empty")}
        </p>
      </Chip>
      <Chip icon={faCoins} variant="none" className="!p-0">
        <p className="font-medium">{t("_entities:product.cost.label")}:</p>
        <p className={!cost ? "italic" : ""}>
          {cost ? `${cost}` : t("_entities:product.cost.empty")}
        </p>
      </Chip>
      <Chip icon={faBoxArchive} variant="none" className="!p-0">
        <p className={stock ? "font-medium" : "italic"}>
          {stock ? (
            <>
              {t("_entities:product.stock.label")}:{" "}
              <span>
                {`${stock} ${t("_entities:product.stock.units")}`}
              </span>
            </>
          ) : (
            t("_entities:product.stock.empty")
          )}
        </p>
      </Chip>
    </ItemCard>
  );
}

export default ProductCard;
