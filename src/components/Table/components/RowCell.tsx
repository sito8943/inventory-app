import { RowCellPropsType } from "./types.ts";

function RowCell(props: RowCellPropsType) {
  const { value, className = "", tooltip = "" } = props;

  return (
    <td
      data-tooltip-id="tooltip-2"
      data-tooltip-content={tooltip}
      className={`border-border border-2 rounded-2xl px-5 py-2 text-gray-50 text-sm ${
        className
      }`}
    >
      {value}
    </td>
  );
}

export default RowCell;
