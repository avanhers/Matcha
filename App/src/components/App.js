import React from "react";
import "./App.css";
import Home from "./home.js";
import MainLayoutContainer from "../containers/mainLayoutContainer.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfilLayout from "./profilLayout.js";
import ProfilLayoutContainer from "../containers/profilLayoutContainer.js";
import MatchRequestContainer from "../containers/matchRequestContainer.js";

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
              Object.keys(user.user).length === 0 ? Home : MainLayoutContainer
            }
          />
          <Route exact path="/profil" component={ProfilLayoutContainer} />
        </Switch>
      </Router>
      {/* <Home /> */}
      <MatchRequestContainer />
    </div>
  );
}

export default App;
