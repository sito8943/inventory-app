import { SelectInputOptionType, SelectInputPropsTypes } from "../types.ts";

export interface AutocompleteInputPropsType
  extends Omit<SelectInputPropsTypes, "value" | "onChange"> {
  value: SelectInputOptionType | SelectInputOptionType[];
  onChange: (value: SelectInputOptionType | SelectInputOptionType[]) => void;
}

export type ValuesPropsType = {
  onDelete: (index: number) => void;
  list: SelectInputOptionType[];
};

export type SuggestionsPropsType = {
  suggestions: SelectInputOptionType[];
  onOptionClick: (option: SelectInputOptionType) => void;
};
