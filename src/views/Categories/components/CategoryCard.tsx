import { useTranslation } from "react-i18next";

// components
import { ItemCard } from "components";

// types
import { CategoryCardPropsType } from "../types/";

function CategoryCard(props: CategoryCardPropsType) {
  const { t } = useTranslation();

  const { id, onClick, actions, name, description, deleted } = props;

  return (
    <ItemCard
      title={name}
      deleted={deleted}
      name={t("_pages:categories.forms.edit")}
      aria-label={t("_pages:categories.forms.editAria")}
      onClick={() => (!deleted ? onClick(id) : {})}
      actions={actions}
    >
      <p
        className={`${!!description ? "" : "!text-xs italic"} text-start ${deleted ? "!text-secondary" : ""}`}
      >
        {!!description
          ? description
          : t("_pages:categories.inputs.description.empty")}
      </p>
    </ItemCard>
  );
}

export default CategoryCard;
