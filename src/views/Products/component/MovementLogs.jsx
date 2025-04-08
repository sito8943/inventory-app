import { useTranslation } from "react-i18next";
import Dialog from "../../../components/Dialog/Dialog";

function MovementLogs(props) {
  const { data, isLoading } = props;
  const { t } = useTranslation();

  console.log(data, isLoading);

  return <div className="flex flex-col gap-5"></div>;
}

export function MovementLogsDialog(props) {
  return (
    <Dialog {...props}>
      <MovementLogs {...props} />
    </Dialog>
  );
}
