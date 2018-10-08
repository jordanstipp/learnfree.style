import React from "react";
import { Link } from "react-router-dom";

const ModeSelect = props => {
  const { mode } = props;
  return (
    <Link className={mode} to={"/" + mode}>
      {mode}
    </Link>
  );
};

export default ModeSelect;
