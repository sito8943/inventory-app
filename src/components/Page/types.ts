import { ReactNode } from "react";

// types
import { AddCardPropsType } from "../Card";

export type PagePropsType = {
  title?: string;
  children: ReactNode;
  isLoading?: boolean;
  addOptions: AddCardPropsType;
  animated?: boolean;
};
