import React from "react";
import { Consumer } from "../../../../context";

const RhymeComp = props => {
  const { type, content } = props;
  return (
    <Consumer>
      {value => {
        return (
          <div className="rhymeComp body">
            <p>{content}</p>
          </div>
        );
      }}
    </Consumer>
  );
};

export default RhymeComp;
