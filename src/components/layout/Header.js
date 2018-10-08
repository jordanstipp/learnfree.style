import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = props => {
  const { branding } = props;
  return (
    <div>
      <Link to="/">{branding}</Link>
    </div>
  );
};

Header.defaultProps = {
  branding: "scienceFreestyle"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
