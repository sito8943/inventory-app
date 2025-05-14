// components
import { Dialog, Table } from "components";

// types
import { MovementLogsDialogPropsType, MovementLogsPropsType } from "./types.ts";

function MovementLogs(props: MovementLogsPropsType) {
  const { isLoading, tableProps, containerClassName = "" } = props;

  return (
    <div className={`flex flex-col gap-5 overflow-auto ${containerClassName}`}>
      <Table isLoading={isLoading} {...tableProps} />
    </div>
  );
}

export function MovementLogsDialog(props: MovementLogsDialogPropsType) {
  return (
    <Dialog {...props}>
      <MovementLogs {...props} />
    </Dialog>
  );
}
