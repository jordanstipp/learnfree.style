import React, { Component } from "react"
import PropTypes from "prop-types"
import { Consumer } from "../../../context"
import ToggleSwitch from "../../General/ToggleSwitch/index.js"
import cog from "../../../images/cog.png"
import exit from "../../../images/exit.png"

import "./SettingsContainer.css"

class SettingsContainer extends Component {
  componentWillMount() {
    document.addEventListener("mousedown", this.closeWindow, false)
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeWindow, false)
  }

  state = { enabled: true, menuOpen: false }

  openMenu = () => {
    this.setState((prevState, props) => ({
      menuOpen: !this.state.menuOpen
    }))
  }

  closeWindow = e => {
    if (!this.state.menuOpen || this.node.contains(e.target)) {
      return
    }

    if (this.cog.contains(e.target)) return

    this.handleClickOutside(e)
  }

  handleClickOutside = e => {
    this.openMenu()
  }

  render() {
    const { enabled, menuOpen } = this.state

    return (
      <Consumer>
        {value => {
          const { helpers, definition, mode } = value
          return (
            <div>
              <div className="IconContainer">
                <img
                  src={cog}
                  alt="Settings"
                  className="icon"
                  onClick={this.openMenu}
                  ref={node => (this.cog = node)}
                />
                <img
                  src={exit}
                  alt="Exit"
                  className="icon"
                  onClick={this.props.exitSession}
                />
              </div>
              {menuOpen && (
                <div className="SettingsWrapper">
                  {!mode ? (
                    <div
                      className="SettingsContainer"
                      ref={node => (this.node = node)}
                    >
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
                      <ToggleSwitch
                        enabled={!enabled}
                        setting="Practice Mode"
                        checked={mode}
                      />
                    </div>
                  ) : (
                    <div
                      className="SettingsContainer"
                      ref={node => (this.node = node)}
                    >
                      <ToggleSwitch
                        enabled={!enabled}
                        setting="Practice Mode"
                        checked={mode}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default props => (
  <Consumer>
    {value => <SettingsContainer {...props} context={value} />}
  </Consumer>
)
