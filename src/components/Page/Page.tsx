// components
import { AddCard, Loading } from "components";

// types
import { PagePropsType } from "./types.ts";

export const Page = (props: PagePropsType) => {
  const {
    title,
    children,
    isLoading,
    addOptions,
    toolbar,
    animated = true,
  } = props;
  return (
    <main className="">
      <div className={`${animated ? "apparition" : ""} flex flex-col gap-5`}>
        <div className="flex items-center justify-between p-5 bg-base">
          <h2 className="text-3xl font-bold">{title}</h2>
          {toolbar}
        </div>
        <div className="p-5 h-full">
          {isLoading ? (
            <Loading containerClassName="flex justify-center items-center h-50" />
          ) : (
            children
          )}
        </div>
      </div>
      {addOptions && <AddCard {...addOptions} />}
    </main>
  );
};
