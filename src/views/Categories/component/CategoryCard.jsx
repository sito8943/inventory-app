import React from "react";

// @emotion/css
import { css } from "@emotion/css";

function CategoryCard(props) {
  const { id, onClick, name, description, color } = props;

  const styles = css({
    background: color,
  });

  return (
    <button
      name=""
      aria-label=""
      onClick={() => onClick(id)}
      className="flex flex-col justify-start items-start h-40 w-60 max-xs:w-full rounded-2xl p-3 group border-primary/30 hover:border-primary border-2 animated"
    >
      <div className="flex items-center gap-2 justify-start">
        <span className={`${styles} w-3 h-3 rounded-full`}></span>
        <h3 className="text-white text-start">{name}</h3>
      </div>
      <p className="text-start text-sm !text-gray-400">{description}</p>
    </button>
  );
}

export default CategoryCard;
