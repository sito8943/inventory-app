import { Actions } from "..";

const ItemCard = (props) => {
  const {
    children,
    containerClassName = "",
    actions = [],
    title = "",
    ...rest
  } = props;

  return (
    <div
      className={`${containerClassName} flex flex-col justify-between items-start h-40 w-60 max-xs:w-full rounded-2xl p-3 group border-primary/30 hover:border-primary border-2 animated`}
    >
      <button
        className="cursor-pointer h-full w-full flex flex-col justify-start items-start"
        {...rest}
      >
        {typeof title === "string" || typeof title === "number" ? (
          <h3 className="text-lg !text-gray-200 text-start">{title}</h3>
        ) : (
          title
        )}
        {children}
      </button>
      <Actions actions={actions} />
    </div>
  );
};

export default ItemCard;
