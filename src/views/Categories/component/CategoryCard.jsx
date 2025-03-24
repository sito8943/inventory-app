import React from "react";

function CategoryCard(props) {
  const { id, name, description, color } = props;

  return (
    <div>
      <div>
        <span className={`${color}`}></span>
        <h3>{name}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default CategoryCard;
