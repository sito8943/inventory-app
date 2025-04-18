import { Loading } from "..";

const Page = (props) => {
  const { title, children, isLoading, animated = true } = props;
  return (
    <main className="p-5">
      <div className={`${animated ? "appirition" : ""} flex flex-col gap-5`}>
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
    </main>
  );
};

export default Page;
