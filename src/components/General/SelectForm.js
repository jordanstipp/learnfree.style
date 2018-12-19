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
    if (url === "") {
      this.setState({ errors: { url: "URL is required" } });
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
            <div className="container">
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                {/* <select>
                  <option value=""> Phase 1 </option>
                </select> */}
                <TextInputGroup
                  label="Sheets URL"
                  name="url"
                  placeholder="Enter Google Sheets URL..."
                  value={url}
                  onChange={this.onChange}
                  error={errors.url}
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
