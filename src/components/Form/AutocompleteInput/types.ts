import { SelectInputOptionType, SelectInputPropsTypes } from "../types.ts";

export interface AutocompleteInputPropsType
  extends Omit<SelectInputPropsTypes, "value" | "onChange"> {
  value: SelectInputOptionType | SelectInputOptionType[];
  onChange: (value: SelectInputOptionType | SelectInputOptionType[]) => void;
}
