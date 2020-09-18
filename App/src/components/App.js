import React from "react";
import "./App.css";
import Home from "./home.js";
import MainLayout from "./mainLayout.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfilLayout from "./profilLayout.js";
function App({ user }) {
  return (
    <div className="App">
      {/* <MainLayout /> */}
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={
              Object.keys(user).length === 0 ? ProfilLayout : MainLayout
            }
          />
          <Route exact path="/match" component={MainLayout} />
        </Switch>
      </Router>
      {/* <Home /> */}
    </div>
  );
}

export default App;
