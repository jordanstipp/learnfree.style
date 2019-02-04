import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../Layout/TextInputGroup";
import { withRouter } from "react-router-dom";
import "./css/SelectForm.css";

class SelectForm extends Component {
  state = {
    url: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { url } = this.state;

    //check for errors
    if (url === "" || this.props.error) {
      this.setState({ errors: { url: "Please Enter a Valid URL" } });
      dispatch({ type: "ERR" });
      return;
    }

    const urlPayload = {
      url,
      ready: "ready"
    };

    dispatch({ type: "GET_ID", payload: urlPayload });
  };

  render() {
    const { url, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="select-form">
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                {/* <select>
                  <option value=""> Phase 1 </option>
                </select> */}
                <TextInputGroup
                  name="url"
                  placeholder="Enter Custom Sheets URL..."
                  value={url}
                  onChange={this.onChange}
                  error={errors.url}
                  type="text"
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default withRouter(SelectForm);
