// components
import { Action } from "./Action";

// types
import { ActionsPropsType } from "./types.ts";

export function Actions(props: ActionsPropsType) {
  const { actions = [] } = props;
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
