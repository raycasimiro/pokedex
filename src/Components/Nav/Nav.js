import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import "./nav.css";

const Nav = ({
  gotoPrevPage,
  gotoNextPage,
  startRange,
  endRange,
  showModal,
}) => {
  return (
    <div className="nav-outer" style={showModal ? { display: "none" } : {}}>
      <nav className="nav-container">
        <div className="pokemon-count">
          <span className="pokemon-range">
            {startRange}-{endRange > 898 ? 898 : endRange}&nbsp;
          </span>
          /&nbsp;898
        </div>
        <div className="nav-pagination">
          <button
            className={`btn-pagination ${
              !gotoPrevPage && "btn-pagination-disabled"
            }`}
            onClick={gotoPrevPage}
            disabled={!gotoPrevPage}
          >
            <BsArrowLeft
              fontSize="1.5rem"
              color="#ffffff"
              style={{ height: "100%" }}
            />
          </button>

          <button
            className={`btn-pagination btn-next ${
              !gotoNextPage && "btn-pagination-disabled"
            }`}
            onClick={gotoNextPage}
            disabled={!gotoNextPage}
          >
            <BsArrowRight
              fontSize="1.5rem"
              color="#ffffff"
              style={{ height: "100%" }}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
