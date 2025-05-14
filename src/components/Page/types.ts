import { ReactNode } from "react";

// types
import { AddCardPropsType } from "../Card/types.ts";

export type PagePropsType = {
  title?: string;
  children: ReactNode;
  isLoading?: boolean;
  addOptions: AddCardPropsType;
  animated?: boolean;
};
