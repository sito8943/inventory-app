export type TableColumn = {
  id: string;
  label: string;
  className: string;
};

export type TablePropsType<TRowDto> = {
  columns: TableColumn[];
  rows: TRowDto[];
  emptyMessage?: string;
};

export type UseTablePropsType<TRowDto> = {
  data: TRowDto[];
  entity: string;
  ignoreColumns?: string[];
  customOptions?: any;
  emptyMessage?: string;
};
