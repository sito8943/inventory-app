const PrettyGrid = (props) => {
  const { emptyMessage, renderComponent, data = [] } = props;

  return data?.length ? (
    <ul className="flex flex-wrap max-xs:flex-col gap-5">
      {data?.map((item) => (
        <li key={item.id}>
          {renderComponent(item)}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center mt-5">{emptyMessage}</p>
  );
};

export default PrettyGrid;
