import { TabPropsType } from "./types.ts";

export const Tab = (props: TabPropsType) => {
  const { id, active, onClick, children } = props;

  return (
    <a
      href={`#${id}`}
      onClick={() => onClick()}
      className={`button submit ${active ? "primary" : "outlined"}`}
    >
      {children}
    </a>
  );
};
