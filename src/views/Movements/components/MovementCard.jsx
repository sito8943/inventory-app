import React from "react";

// @emotion/css
import Actions from "../../../components/Actions/Actions";

function MovementCard(props) {
  const { id, onClick, actions, name, type } = props;

  return (
    <div className="flex flex-col justify-between items-start h-40 w-60 max-xs:w-full rounded-2xl p-3 group border-primary/30 hover:border-primary border-2 animated">
      <button
        className="cursor-pointer h-full flex flex-col"
        name=""
        aria-label=""
        onClick={() => onClick(id)}
      >
        <div className="flex items-center gap-2 justify-start">
          <h3 className="text-white text-start">{name}</h3>
        </div>
      </button>

      <Actions actions={actions} />
    </div>
  );
}

export default MovementCard;
