// components
import { Dialog, Table } from "components";

// types
import { MovementLogsDialogPropsType, MovementLogsPropsType } from "../types";

function MovementLogs(props: MovementLogsPropsType) {
  const { tableProps, containerClassName = "" } = props;

  return (
    <div className={`flex flex-col gap-5 overflow-auto ${containerClassName}`}>
      <Table {...tableProps} />
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
