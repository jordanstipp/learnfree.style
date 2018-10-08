import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import RhymeComp from "./RhymeComp";
import "./Rhyme.css";

class Rhyme extends Component {
  state = {
    index: 0
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { rhyme } = this.props;
          return (
            <div>
              <h1 className="rhyme">{rhyme.rhyme}</h1>
              <div className="line"> </div>
              <RhymeComp
                className="subRhyme"
                type="defintion"
                content={rhyme.definition}
              />
              <RhymeComp
                className="subRhyme"
                type="helpers"
                content={rhyme.helpers}
              />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Rhyme;
