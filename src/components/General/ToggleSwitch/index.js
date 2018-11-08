import PropTypes from "prop-types";
import classnames from "classnames";
import React, { Component } from "react";
import "./index.css";

import { Consumer } from "../../../context";

class ToggleSwitch extends Component {
  state = { enabled: true };

  isEnabled = () => this.state.enabled;

  handleCheck = event => {
    const { setting } = this.props;

    const { dispatch } = this.props.context;
    dispatch({ type: "SETTINGS", payload: setting });

    this.setState({ enabled: !this.state.enabled }, () => {
      const state = this.state;
    });
  };

  render() {
    const { enabled } = this.state;
    const { setting, checked } = this.props;

    return (
      <Consumer>
        {value => {
          return (
            <div>
              <label>
                {setting}
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  defaultChecked={checked}
                />
              </label>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

ToggleSwitch.propTypes = {
  theme: PropTypes.string,
  enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onStateChanged: PropTypes.func
};

export default props => (
  <Consumer>{value => <ToggleSwitch {...props} context={value} />}</Consumer>
);
