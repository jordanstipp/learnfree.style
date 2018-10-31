import React, { Component } from "react";
import Sound from "react-sound";

import { Consumer } from "../../context";
import Rhyme from "../content/Rhyme";

import config from "../../config";
import { load } from "../../functions/spreadsheet";
import { shuffle } from "../../functions/shuffle";
import SelectForm from "../content/SelectForm";
import LoadingAnim from "../content/LoadingAnim";
import "./Freestyle.css";

class Freestyle extends Component {
  state = {
    currentRhyme: "",
    intervalId: 0,
    index: 0
  };

  componentWillMount;
  async componentDidMount() {
    //look into updating setstate here
  }
  async componentDidUpdate() {
    if (this.props.context.spId != "" && this.props.context.loading) {
      console.log(this.props.context.spId);
      window.gapi.load("client", this.initClient);
      document.addEventListener("keydown", this.handleKey.bind(this));
    }
    if (!this.props.context.loading && this.intervalId) {
      this.setState((state, props) => ({
        index: this.state.index + 1,
        intervalId: setInterval(() => this.tick(), 5000)
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
        load(this.onLoad, this.props.context.spId, this.props.context.shId);
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
      this.setState((state, props) => ({
        intervalId: setInterval(() => this.tick(), 5000)
      }));
      dispatch({ type: "START", payload: { ready: true } });
    }
  };

  handleKey(e) {
    if (e.keyCode === 37 && this.state.index !== 0) {
      this.handleKeyDown("LEFT");
    } else if (
      e.keyCode === 39 &&
      this.state.index !== this.props.context.rhymes.length - 1
    ) {
      this.handleKeyDown("RIGHT");
    }
  }

  handleKeyDown = key => {
    clearInterval(this.state.intervalId);
    switch (key) {
      case "LEFT":
        this.setState((state, props) => ({
          index: this.state.index - 1,
          intervalId: setInterval(() => this.tick(), 5000)
        }));
        break;
      case "RIGHT":
        this.setState((state, props) => ({
          index: this.state.index + 1,
          intervalId: setInterval(() => this.tick(), 5000)
        }));
        break;
    }
  };

  tick() {
    if (this.state.index !== this.props.context.rhymes.length - 1) {
      this.setState((state, props) => ({
        index: this.state.index + 1
      }));
    } else {
      this.setState((state, props) => ({
        index: 0
      }));
    }
  }

  resetTimer() {
    //Reset Timer
    clearInterval(this.state.intervalId);
  }

  render() {
    const { currentRhyme } = this.state;
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
