import React, { Component } from "react";
import Sound from "react-sound";

import { Consumer } from "../../../context";
import Rhyme from "../Freestyle/RhymeComp/Rhyme";

import config from "../../../config";
import { loadSpreadsheet } from "../../../services/loadSpreadsheet";
import { shuffle } from "../../../services/shuffle";
import SelectForm from "../../General/SelectForm";
import LoadingAnim from "../../General/LoadingAnim";
import Freestyle from "../Freestyle/Freestyle";
import "./index.css";
import SettingsContainer from "../../Layout/SettingsMenu/SettingsContainer";

const INTERVAL_TIME = 7000;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = { error: false };

  componentDidUpdate() {
    if (this.props.context.spId != "" && this.props.context.loading) {
      window.gapi.load("client", this.initClient);
    }
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

  onLoad = (data, e) => {
    if (!data) {
      this.setState((prevState, props) => {
        error: e;
      });
    } else if (data) {
      // turn off shuffle for now
      // const rhymes = shuffle(data.rhymes);
      const rhymes = data.rhymes;
      console.log(data.rhymes);
      const { dispatch } = this.props.context;
      dispatch({
        type: "LOAD_RHYMES",
        payload: [rhymes, 1, 1]
      });
      dispatch({ type: "LOAD_COMPLETE", payload: [false, 1, 1, 1] });
      dispatch({
        type: "START",
        payload: { ready: true, callback: this.changeURL }
      });
    }
  };

  exitSession = () => {
    const { dispatch } = this.props.context;
    dispatch({ type: "DELETE_LIST", payload: [[], true] });
  };

  selectForm = () => {
    return <SelectForm error={this.props.context.error} />;
  };

  onClick = (textContent, dispatch, e) => {
    if (textContent === "Life") {
      const urlPayload = {
        url:
          "https://docs.google.com/spreadsheets/d/1Mv0mtgmlr7__8V4GoXjWy2bzuiAF2BDhuHt2fh_ssZg/edit#gid=0",
        ready: "ready"
      };

      dispatch({ type: "GET_ID", payload: urlPayload });
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { sheet, loading, rhymes, dispatch } = value;
          if (sheet) {
            return (
              <div className="activity">
                <Freestyle rhymes={rhymes} exitSession={this.exitSession} />
              </div>
            );
          } else {
            return (
              <div className="container">
                {this.selectForm()}
                <a
                  className="button"
                  onClick={this.onClick.bind(this, "Life", dispatch)}
                >
                  Life
                </a>
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default props => (
  <Consumer>{value => <Home {...props} context={value} />}</Consumer>
);

//export default Freestyle;
