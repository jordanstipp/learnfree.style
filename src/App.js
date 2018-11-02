import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Modes from "./components/content/Modes";
import Train from "./components/pages/Train";
import Freestyle from "./components/pages/Freestyle";
import NotFound from "./components/pages/NotFound";
// import logo from './logo.svg';
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
              <Route exact path="/train" component={Train} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
