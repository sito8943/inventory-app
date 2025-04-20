import React from "react";
import { useTranslation } from "react-i18next";

// @emotion/css
import { css } from "@emotion/css";

// components
import Actions from "../../../components/Actions/Actions";
import ItemCard from "../../../components/Card/ItemCard";

function CategoryCard(props) {
  const { t } = useTranslation();

  const { id, onClick, actions, name, description, color } = props;

  const styles = css({
    background: color,
  });

  return (
    <ItemCard
      title={
        <div className="flex items-center gap-2 justify-start">
          <span className={`${styles} w-3 h-3 rounded-full`}></span>
          <h3 className="!text-gray-200 text-lg text-start">{name}</h3>
        </div>
      }
      name={t("_pages:categories.forms.edit")}
      aria-label={t("_pages:categories.forms.editAria")}
      onClick={() => onClick(id)}
      actions={actions}
    >
      <p className="text-sm text-start">
        {description ?? t("_pages:categories.inputs.description.empty")}
      </p>
    </ItemCard>
  );
}

export default CategoryCard;
