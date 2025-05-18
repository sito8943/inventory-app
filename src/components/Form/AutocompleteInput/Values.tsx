// components
import { DeletableChip } from "../../Chip";

// types
import { SelectInputOptionType } from "components";
import { ValuesPropsType } from "./types.ts";

export const Values = (props: ValuesPropsType) => {
  const { list = [], onDelete } = props;

  return (
    <div className="flex items-center justify-start flex-wrap mt-4 gap-2">
      {list.map((selected: SelectInputOptionType, i: number) => (
        <DeletableChip
          key={selected.name}
          text={selected.name}
          onDelete={() => onDelete(i)}
        />
      ))}
    </div>
  );
};
