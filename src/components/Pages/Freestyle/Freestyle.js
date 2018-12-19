import React, { Component } from "react";
import Sound from "react-sound";

import { Consumer } from "../../../context";
import Rhyme from "./RhymeComp/Rhyme";

import config from "../../../config";
import { loadSpreadsheet } from "../../../services/loadSpreadsheet";
import { shuffle } from "../../../services/shuffle";
import SelectForm from "../../General/SelectForm";
import LoadingAnim from "../../General/LoadingAnim";
import "./css/Freestyle.css";
import SettingsContainer from "../../Layout/SettingsMenu/SettingsContainer";

const INTERVAL_TIME = 7000;

class Freestyle extends Component {
  constructor(props) {
    super(props);
    this.intervalId;
  }
  ////////////////////////////////////////////////////////////////////////////////////
  state = {
    currentRhyme: "",
    okSetInt: false,
    index: 0
  };
  ////////////////////////////////////////////////////////////////////////////////////
  componentDidUpdate() {
    if (this.state.okSetInt) {
      clearInterval(this.intervalId);
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  ///////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey.bind(this));
    clearInterval(this.intervalId);
  }
  //////////////////////////////////////////////////////////////////////////////////
  handleKey(e) {
    if (e.keyCode === 37 && this.state.index !== 0) {
      clearInterval(this.intervalId);
      this.handleKeyDown("LEFT");
    } else if (
      e.keyCode === 39 &&
      this.state.index !== this.props.context.rhymes.length - 1
    ) {
      clearInterval(this.intervalId);
      this.handleKeyDown("RIGHT");
    } else if (this.state.index === 0 && !this.props.context.loading) {
      this.setState((state, props) => ({
        index: this.props.context.rhymes.length - 1,
        okSetInt: true
      }));
    } else {
      this.setState((state, props) => ({
        index: 0,
        okSetInt: true
      }));
    }
    e.stopPropagation();
    this.intervalId = -1;
  }
  ////////////////////////////////////////////////////////////////////////////////////
  handleKeyDown = key => {
    switch (key) {
      case "LEFT":
        this.setState(prevState => ({
          index: this.state.index - 1,
          okSetInt: true
        }));
        break;
      case "RIGHT":
        this.setState(prevState => ({
          index: this.state.index + 1,
          okSetInt: true
        }));
        break;
    }
    console.log(this.state.index);
  };
  ////////////////////////////////////////////////////////////////////////////////////
  tick() {
    if (this.intervalId === -1) return;
    if (this.state.index !== this.props.context.rhymes.length - 1) {
      this.setState((prevState, props) => ({
        index: prevState.index + 1
      }));
    } else {
      this.setState((prevState, props) => ({
        index: 0
      }));
    }
    console.log(this.state.index);
  }
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  render() {
    const { currentRhyme } = this.state;
    return (
      <Consumer>
        {value => {
          const { loading } = value;
          return !loading ? (
            <div>
              <Sound
                url="advancement.mp3"
                playStatus={Sound.status.PLAYING}
                playbackRate={1}
                loop={true}
              />
              <SettingsContainer exitSession={this.props.exitSession} />
              <Rhyme
                className="container"
                rhyme={this.props.rhymes[this.state.index]}
              />
            </div>
          ) : (
            <div className="container">
              <Sound url="advancement.mp3" playStatus={Sound.status.PAUSED} />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default props => (
  <Consumer>{value => <Freestyle {...props} context={value} />}</Consumer>
);

//export default Freestyle;
