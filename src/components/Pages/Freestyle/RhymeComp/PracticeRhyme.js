import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../../../context";
import RhymeComp from "./RhymeComp";
import "./Rhyme.css";

class PracticeRhyme extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { rhyme } = this.props;
          const { helpers, definition } = value;
          return (
            <div className="rhyme-container">
              <h1 className="rhyme">{rhyme.sentence}</h1>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default props => (
  <Consumer>{value => <PracticeRhyme {...props} context={value} />}</Consumer>
);
