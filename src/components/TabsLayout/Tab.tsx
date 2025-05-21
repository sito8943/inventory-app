import { TabPropsType } from "./types.ts";

export const Tab = (props: TabPropsType) => {
  const { id, active, onClick, children } = props;

  return (
    <a
      href={`#${id}`}
      onClick={() => onClick()}
      className={`button !px-3 !pt-2 !border-none ${active ? "primary" : "outlined"}`}
    >
      {children}
    </a>
  );
};
