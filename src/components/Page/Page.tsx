// components
import { AddCard, Loading } from "components";

// types
import { PagePropsType } from "./types.ts";

export const Page = (props: PagePropsType) => {
  const { title, children, isLoading, addOptions, animated = true } = props;
  return (
    <main className="p-5">
      <div className={`${animated ? "apparition" : ""} flex flex-col gap-5`}>
        <h2 className="text-3xl font-bold">{title}</h2>
        {isLoading ? (
          <Loading className="flex justify-center items-center h-50" />
        ) : (
          children
        )}
      </div>
      <AddCard {...addOptions} />
    </main>
  );
};
