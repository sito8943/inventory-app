import { DeletableChip } from "../../Chip/DeletableChip.jsx";

export const Values = (props) => {
  const { list = [], onDelete } = props;

  return (
    <div className="flex items-center justify-start flex-wrap my-4 gap-2">
      {list.map((selected, i) => (
        <DeletableChip
          key={selected.value}
          text={selected.value}
          onDelete={() => onDelete(i)}
        />
      ))}
    </div>
  );
};
