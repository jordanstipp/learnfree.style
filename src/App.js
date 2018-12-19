import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./components/Pages/Home/index";
import Freestyle from "./components/Pages/Freestyle/Freestyle";
import NotFound from "./components/Pages/NotFound";

import "./index.css";

import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="container">
            <Header className="title" branding="LearnFreestyle" />
            <div className="container">
              <Switch>
                <Route className="route" exact path="/" component={Home} />
                <Route component={NotFound} />
                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
