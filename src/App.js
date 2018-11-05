import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Layout/Header";
import Modes from "./components/Layout/Activities/Modes";
import Freestyle from "./components/Pages/Freestyle/Freestyle";
import NotFound from "./components/Pages/NotFound";

import "./App.css";

import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header className="title" branding="LearnFreestyle" />
            <Switch>
              <Route exact path="/" component={Modes} />
              <Route exact path="/freestyle" component={Freestyle} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
