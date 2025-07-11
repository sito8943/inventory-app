// types
import { FormContainerPropsType } from "./types";

export function FormContainer(props: FormContainerPropsType) {
  const { children } = props;

  return <div className="flex flex-col gap-5 pt-1">{children}</div>;
}
