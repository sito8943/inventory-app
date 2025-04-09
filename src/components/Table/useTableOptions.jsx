import { useMemo } from "react";
import { useTranslation } from "react-i18next";

function useTableOptions(props) {
  const { t } = useTranslation();

  const { data, entity, ignoreColumns = [], customOptions = {} } = props;

  const rows = useMemo(() => {
    if (!data) return [];

    return data.map((item) => {
      const row = { ...item };
      ignoreColumns.forEach((column) =>
        column !== "id" ? delete row[column] : null
      );

      Object.keys(row).forEach((column) => {
        const newRow = {};

        //* value parser
        if (customOptions[column]?.rowOptions?.parser)
          newRow.value = customOptions[column].rowOptions.parser(row[column]);
        else newRow.value = row[column];

        //* tooltip
        if (customOptions[column]?.rowOptions?.showTooltip) {
          if (customOptions[column]?.rowOptions?.customTooltip)
            newRow.tooltip = "";
          else newRow.tooltip = row[column];
        }

        //* row class name
        if (customOptions[column]?.rowOptions?.className)
          newRow.className = customOptions[column].rowOptions.className;

        row[column] = newRow;
      });

      return row;
    });
  }, [data, ignoreColumns]);

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    const firstRow = data[0];
    const keys = Object.keys(firstRow).filter(
      (key) => !ignoreColumns.includes(key)
    );

    return keys.map((key) => ({
      id: key,
      label: t(`_pages:${entity}.properties.${key}`),
      className: customOptions[key]?.columnOptions?.className
        ? customOptions[key]?.columnOptions?.className
        : "text-left",
    }));
  }, [data, ignoreColumns]);

  return { rows, columns };
}

export default useTableOptions;
