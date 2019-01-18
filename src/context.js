import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        sheet: action.payload.ready
      };

    case "GET_ID":
      //regex for strings
      if (action.payload.url != null) {
        var spreadSheetId = action.payload.url.match(
          "/spreadsheets/d/([a-zA-Z0-9-_]+)"
        );
      }
      if (spreadSheetId != null) {
        spreadSheetId = spreadSheetId[0];
        spreadSheetId = spreadSheetId.replace("/spreadsheets/d/", "");

        var sheetId = action.payload.url.match("[#&]gid=([0-9]+)");

        if (sheetId) {
          sheetId = sheetId[0];
        }
        sheetId = sheetId.replace("#gid=", "");

        sheetId.slice(5);
        return {
          ...state,
          spId: spreadSheetId,
          shId: sheetId
        };
      } else {
        return {
          ...state,
          error: true
        };
      }

    case "LOAD_RHYMES":
      return {
        ...state,
        rhymes: action.payload[0]
      };

    case "LOAD_COMPLETE":
      return {
        ...state,
        loading: action.payload[0]
      };

    case "DELETE_LIST":
      return {
        ...state,
        sheet: "",
        rhymes: "",
        loading: action.payload[1],
        shuffle: false,
        spId: ""
      };

    case "ERR":
      return {
        ...state,
        error: false
      };

    case "SETTINGS":
      if (action.payload === "helpers") {
        return {
          ...state,
          helpers: !state.helpers
        };
      } else if (action.payload === "definition") {
        return {
          ...state,
          definition: !state.definition
        };
      } else if (action.payload === "Practice Mode") {
        return {
          ...state,
          mode: !state.mode
        };
      }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    // spId: "1IFKJ5A3l4PbprvJfx5N7uhVRvwT0v_tKelDcp_7uqO8",
    // shId: "672334735",
    spId: "",
    shId: "",
    loading: true,
    sheet: "",
    helpers: true,
    definition: true,
    mode: false,
    error: false,
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = withRouter(Context.Consumer);
