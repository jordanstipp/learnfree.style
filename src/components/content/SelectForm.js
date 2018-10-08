import React, { Component } from "react";
import { Consumer } from "../../context";

class SelectForm extends Component {
  onSubmit = (dispatch, e) => {
    e.preventDefault();
    dispatch({ type: "START", payload: "ready" });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="container">
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <select>
                  <option value=""> Phase 1 </option>
                </select>
                <input type="submit" value="Submit" />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SelectForm;
