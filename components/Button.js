const Button = (props) => (
  <button
    className="disabled:opacity-50 px-2 py-1 rounded bg-blue-500 bg-opacity-25 cursor-pointer border-blue-800 border-opacity-50 duration-75 shadow hover:bg-opacity-75 hover:border-opacity-100"
    {...props}
  />
);

export default Button;
