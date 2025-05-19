import { ReactNode } from "react";

export type TabsLayoutPropsType = {
  tabs: TabsType[];
  content: ReactNode;
};

export type TabsType = {
  id: number | string;
  label: string;
};

export type TabPropsType = {
  children: ReactNode;
  id: number | string;
  active: boolean;
  onClick: () => void;
};
