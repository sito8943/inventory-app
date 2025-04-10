// components
import Table from "../../../components/Table/Table";
import Dialog from "../../../components/Dialog/Dialog";

function MovementLogs(props) {
  const { isLoading, tableProps, containerClassName } = props;

  return (
    <div className={`flex flex-col gap-5 overflow-auto ${containerClassName}`}>
      <Table isLoading={isLoading} {...tableProps} />
    </div>
  );
}

export function MovementLogsDialog(props) {
  return (
    <Dialog {...props}>
      <MovementLogs {...props} />
    </Dialog>
  );
}
