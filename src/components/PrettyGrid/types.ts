import { JSX } from "react";

export type PrettyGridPropsType = {
  emptyMessage?: string;
  data?: any[];
  renderComponent: (item: any) => JSX.Element;
};
