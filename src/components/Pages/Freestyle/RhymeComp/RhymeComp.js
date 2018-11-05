import React from "react";
import { Consumer } from "../../../../context";

const RhymeComp = props => {
  const { type, content } = props;
  return (
    <Consumer>
      {value => {
        return (
          <div>
            <span className="rhymeComp body">
              <p>{content}</p>
            </span>
          </div>
        );
      }}
    </Consumer>
  );
};

export default RhymeComp;
