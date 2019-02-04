import React from "react";
import { Consumer } from "../../../../context";

const RhymeComp = props => {
  const { type, content, className } = props;
  return (
    <Consumer>
      {value => {
        return (
          <div className="rhymeComp body">
            <p className={className}> {content}</p>
          </div>
        );
      }}
    </Consumer>
  );
};

export default RhymeComp;
