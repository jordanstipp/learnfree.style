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

const INTERVAL_TIME = 7000;

class Freestyle extends Component {
  state = {
    currentRhyme: "",
    intervalId: 0,
    okSetInt: false,
    index: 0
  };

  componentDidUpdate() {
    if (this.props.context.spId != "" && this.props.context.loading) {
      console.log(this.props.context.spId);
      window.gapi.load("client", this.initClient);
      document.addEventListener("keyup", this.handleKey.bind(this));
    }

    if (this.state.okSetInt) {
      this.setState((prevState, props) => ({
        intervalId: setInterval(() => this.tick(), INTERVAL_TIME),
        okSetInt: false
      }));
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props.context;
    dispatch({ type: "DELETE_LIST", payload: [[], true] });
    clearInterval(this.state.intervalId);
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        // 3. Initialize and make the API request.
        loadSpreadsheet(
          this.onLoad,
          this.props.context.spId,
          this.props.context.shId
        );
      });
  };

  onLoad = (data, error) => {
    if (data) {
      const rhymes = shuffle(data.rhymes);
      const { dispatch } = this.props.context;
      dispatch({
        type: "LOAD_RHYMES",
        payload: [rhymes, 1, 1]
      });
      dispatch({ type: "LOAD_COMPLETE", payload: [false, 1, 1, 1] });
      dispatch({ type: "START", payload: { ready: true } });
      clearInterval(this.state.intervalId);
      this.setState((prevState, props) => ({
        intervalId: setInterval(() => this.tick(), INTERVAL_TIME)
      }));
    }
  };

  handleKey(e) {
    if (e.keyCode === 37 && this.state.index !== 0) {
      clearInterval(this.state.intervalId);
      console.log("i cleared left interval " + this.state.intervalId);
      this.handleKeyDown("LEFT");
    } else if (
      e.keyCode === 39 &&
      this.state.index !== this.props.context.rhymes.length - 1
    ) {
      clearInterval(this.state.intervalId);
      console.log("i cleared right interval " + this.state.intervalId);
      this.handleKeyDown("RIGHT");
    }
  }

  handleKeyDown = key => {
    switch (key) {
      case "LEFT":
        this.setState((state, props) => ({
          index: state.index - 1,
          okSetInt: true
        }));
        break;
      case "RIGHT":
        this.setState((state, props) => ({
          index: state.index + 1,
          okSetInt: true
        }));
        break;
    }
  };

  tick() {
    if (this.state.index !== this.props.context.rhymes.length - 1) {
      this.setState((prevState, props) => ({
        index: prevState.index + 1
      }));
    } else {
      this.setState((prevState, props) => ({
        index: 0
      }));
    }
  }

  render() {
    const { currentRhyme, okSetInt } = this.state;
    return (
      <Consumer>
        {value => {
          const { sheet, loading, rhymes } = value;
          if (sheet) {
            return !loading ? (
              <div className="container">
                <Sound
                  url="advancement.mp3"
                  playStatus={Sound.status.PLAYING}
                  playbackRate={1}
                  loop={true}
                />
                <Rhyme rhyme={this.props.context.rhymes[this.state.index]} />
              </div>
            ) : (
              <div>
                <Sound url="advancement.mp3" playStatus={Sound.status.PAUSED} />
                <LoadingAnim />
              </div>
            );
          } else {
            return (
              <div>
                <SelectForm />
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default props => (
  <Consumer>{value => <Freestyle {...props} context={value} />}</Consumer>
);

//export default Freestyle;
