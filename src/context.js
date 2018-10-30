import React, { Component } from "react";

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
      var spreadSheetId = action.payload.url.match(
        "/spreadsheets/d/([a-zA-Z0-9-_]+)"
      );
      if (spreadSheetId) {
        spreadSheetId = spreadSheetId[0];
      }
      spreadSheetId = spreadSheetId.replace("/spreadsheets/d/", "");

      var sheetId = action.payload.url.match("[#&]gid=([0-9]+)");
      if (sheetId) {
        sheetId = sheetId[0];
      }
      sheetId.slice(5);
      console.log(spreadSheetId);
      return {
        ...state,
        spId: spreadSheetId,
        shId: sheetId
      };
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
        loading: action.payload[1],
        shuffle: false
      };
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

export const Consumer = Context.Consumer;
