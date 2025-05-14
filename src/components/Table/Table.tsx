import { Tooltip } from "react-tooltip";

// components
import RowCell from "./components/RowCell";

// types
import { TablePropsType } from "./types.ts";

function Table(props: TablePropsType) {
  const { columns = [], rows = [], emptyMessage = "" } = props;

  return !!rows?.length ? (
    <>
      <Tooltip id="tooltip-2" />
      <table className="">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={`border-border border-2 text-gray-300 px-5 py-2 text-base ${column.className}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id?.value} className={`${row.className ?? ""}`}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  tooltip={row[column.id]?.tooltip ?? ""}
                  value={row[column.id]?.value ?? ""}
                  className={row[column.id]?.className ?? ""}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <p className="!text-gray-400 text-center mt-5">{emptyMessage}</p>
  );
}

export default Table;
