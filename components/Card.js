const Card = ({ className, as = "div", ...props }) => {
  const ElementAs = as;
  return (
    <ElementAs
      className={"bg-gray-100 rounded p-4 shadow-sm " + className}
      {...props}
    />
  );
};

export default Card;
