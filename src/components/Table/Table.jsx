function Table(props) {
  const { columns, rows } = props;

  return (
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
              <td
                className={`border-border border-2 rounded-2xl px-5 py-2 text-gray-50 text-sm ${
                  row[column.id]?.className ?? ""
                }`}
                key={column.id}
              >
                {row[column.id]?.value ?? ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
