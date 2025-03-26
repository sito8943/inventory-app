import React from "react";
import Action from "./Action";

function Actions(props) {
  const { actions } = props;
  return (
    <ul className="flex w-full items-center justify-end">
      {actions?.map((action) => (
        <li key={action.id}>
          <Action {...action} />
        </li>
      ))}
    </ul>
  );
}

export default Actions;
