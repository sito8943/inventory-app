import { ReactNode } from "react";
import { Action } from "@sito/dashboard";

// types
import { AddCardPropsType } from "../Card";
import { BaseEntityDto } from "lib";

export type PagePropsType<TRow extends BaseEntityDto> = {
  title?: string;
  children: ReactNode;
  isLoading?: boolean;
  addOptions?: AddCardPropsType;
  animated?: boolean;
  actions?: Action<TRow>[];
};
