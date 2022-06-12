import { useState } from "react";
import "./loader.css";

const Loader = ({ icon, message }) => {
  const [iconIsLoaded, setIconIsLoaded] = useState(false);

  return (
    <div
      className="loading-modal"
      style={iconIsLoaded ? {} : { display: "none" }}
    >
      <img
        src={icon}
        alt=""
        width="200px"
        className="pokeball-loader"
        onLoad={() => setIconIsLoaded(true)}
      />
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loader;
