import { AddCard, Loading } from "..";

// types
import { PagePropsType } from "./types.ts";

const Page = (props: PagePropsType) => {
  const { title, children, isLoading, addOptions, animated = true } = props;
  return (
    <main className="p-5">
      <div className={`${animated ? "apparition" : ""} flex flex-col gap-5`}>
        <h2 className="text-xl font-bold">{title}</h2>
        {isLoading ? (
          <Loading
            size="text-3xl"
            containerClassName="flex justify-center items-center h-50"
          />
        ) : (
          children
        )}
      </div>
      <AddCard {...addOptions} />
    </main>
  );
};

export default Page;
