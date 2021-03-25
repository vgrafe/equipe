const getTextColor = (bgColor) => {
  const R = parseInt(bgColor.substr(0, 2), 16);
  const G = parseInt(bgColor.substr(2, 2), 16);
  const B = parseInt(bgColor.substr(4, 2), 16);

  const brightness = Math.round(
    (parseInt(R) * 299 + parseInt(G) * 587 + parseInt(B) * 114) / 1000
  );

  return brightness > 138 ? "black" : "white";
};

const Label = ({ color, text }) => (
  <span
    className="p-1 rounded font-medium whitespace-no-wrap"
    style={{
      backgroundColor: `#${color}`,
      color: getTextColor(color),
    }}
  >
    {text}
  </span>
);

export default Label;
