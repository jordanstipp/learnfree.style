import React from "react";
import ModeSelect from "./ModeSelect";
import { Consumer } from "../../../context";

const Modes = props => {
  return (
    <Consumer>
      {value => {
        return (
          <div>
            <ModeSelect mode="Freestyle" className />
          </div>
        );
      }}
    </Consumer>
  );
};

export default Modes;
