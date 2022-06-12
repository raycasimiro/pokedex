import { useEffect } from "react";
import { useState } from "react";
import "./statbar.css";

const StatBar = ({ bgcolor, value, label, basestat }) => {
  const [style, setStyle] = useState();

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        width: `${value}%`,
        backgroundColor: bgcolor,
        opacity: 1,
      };
      setStyle(newStyle);
    }, 200);
  }, [bgcolor, value]);

  const statName = {
    textTransform: "capitalize",
    fontSize: 14,
  };

  const statValue = {
    color: "#37474f",
    fontSize: 19,
  };

  const outerStyles = {
    display: "flex",
    flexWrap: "no-wrap",
    alignItems: "center",
    // marginBottom: ".2rem",
  };

  const statContainerStyles = {
    flexBasis: 50,
    textAlign: "right",
  };

  return (
    <>
      <div style={statName}>{label}</div>
      <div style={outerStyles}>
        <div className="bar-container">
          <div className="bar" style={style}></div>
        </div>
        <div style={statContainerStyles}>
          <span style={statValue}>{`${basestat}`}</span>
        </div>
      </div>
    </>
  );
};

export default StatBar;
