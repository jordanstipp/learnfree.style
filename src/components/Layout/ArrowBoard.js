import React from "react";
import PropTypes from "prop-types";
import "./css/ArrowBoard.css";
import leftarrow from "../../images/left-arrow.png";
import rightarrow from "../../images/right-arrow.png";
import logo from "../../images/logo-white.png";

const ArrowBoard = ({ clickLeft, clickRight }) => {
  return (
    <div className="ArrowBoard">
      <img
        src={leftarrow}
        alt="Left Arrow"
        className="icon"
        onClick={clickLeft}
      />
      <div className="image-container">
        <img id="tom" src={logo} alt="Science With Tom Logo" className="icon" />{" "}
      </div>
      <img
        src={rightarrow}
        alt="Left Arrow"
        className="icon"
        onClick={clickRight}
      />
    </div>
  );
};

ArrowBoard.propTypes = {
  // label: PropTypes.string.isRequired,
  clickLeft: PropTypes.func.isRequired,
  clickRight: PropTypes.func.isRequired
};

ArrowBoard.defaultProps = {};

export default ArrowBoard;
