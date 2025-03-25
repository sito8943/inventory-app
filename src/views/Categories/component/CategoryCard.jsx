import React from "react";

function CategoryCard(props) {
  const { id, onClick, name, description, color } = props;

  return (
    <button
      name=""
      aria-label=""
      onClick={() => onClick(id)}
      className="flex flex-col h-40 w-40 rounded-2xl p-5 group border-primary/30 hover:border-primary border-2 animated"
    >
      <div className="flex items-start justify-start flex-col">
        <span className={`${color}`}></span>
        <h3 className="text-lg text-white">{name}</h3>
      </div>
      <p>{description}</p>
    </button>
  );
}

export default CategoryCard;
