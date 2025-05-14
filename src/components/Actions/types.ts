import { MouseEventHandler, ReactNode } from "react";

export type ActionPropsType = {
  id: string;
  hidden?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  tooltip: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type ActionsPropsType = {
  actions: ActionPropsType[];
};
