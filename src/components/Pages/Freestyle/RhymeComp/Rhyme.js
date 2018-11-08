import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../../../context";
import RhymeComp from "./RhymeComp";
import "./Rhyme.css";

class Rhyme extends Component {
  state = {
    index: 0
  };

  onClick = () => {
    const { dispatch } = this.props.context;
    dispatch({ type: "SETTINGS", payload: setting });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { rhyme } = this.props;
          const { helpers, definition } = value;
          return (
            <div>
              {helpers && (
                <RhymeComp
                  className="subRhyme"
                  type="helpers"
                  content={rhyme.helpers}
                  onClick={this.onClick}
                />
              )}
              <h1 className="rhyme">{rhyme.rhyme}</h1>
              {/* <div className="line"> </div>
               */}
              {definition && (
                <RhymeComp
                  className="subRhyme"
                  type="defintion"
                  content={rhyme.definition}
                  onClick={this.onClick}
                />
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default props => (
  <Consumer>{value => <Rhyme {...props} context={value} />}</Consumer>
);
// export default Rhyme;
