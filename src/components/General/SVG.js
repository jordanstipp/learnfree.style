import React from "react";

const getViewBox = name => {
  switch (name) {
    case "left_arrow":
      return "0 0 32 33";
    case "right_arrow":
      return "0 0 38 34";
    default:
      return "0 0 32 32";
  }
};

const getPath = (name, props) => {
  switch (name) {
    case "left_arrow":
      return <path {...props} d="../../../images/left-arrow.svg" />;
    case "right_arrow":
      return <path {...props} d="../../../images/right-arrow.svg" />;
    default:
      return <path />;
  }
};

const SVGIcon = ({
  name = "",
  style = {},
  fill = "#000",
  viewBox = "",
  width = "100%",
  className = "",
  height = "100%"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {getPath(name, { fill })}
  </svg>
);

export default SVGIcon;
