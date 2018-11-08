import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../../context";
import ToggleSwitch from "../../General/ToggleSwitch/index.js";

import "./SettingsContainer.css";

class SettingsContainer extends Component {
  state = { enabled: true, menuOpen: false };

  openMenu = () => {
    this.setState((prevState, props) => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  render() {
    const { enabled, menuOpen } = this.state;

    return (
      <Consumer>
        {value => {
          const { helpers, definition } = value;
          return (
            <div>
              <div className="SettingsButton" onClick={this.openMenu} />
              {menuOpen && (
                <div className="SettingsContainer">
                  <ToggleSwitch
                    enabled={enabled}
                    setting="helpers"
                    checked={helpers}
                  />
                  <ToggleSwitch
                    enabled={enabled}
                    setting="definition"
                    checked={definition}
                  />
                </div>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default props => (
  <Consumer>
    {value => <SettingsContainer {...props} context={value} />}
  </Consumer>
);
