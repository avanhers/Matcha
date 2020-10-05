import React from "react";
import "./App.css";
import Home from "./pages/home/components/home.js";
import MainLayoutContainer from "./pages/main/containers/mainLayoutContainer.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfilLayoutContainer from "./pages/profile/containers/profilLayoutContainer.js";
import MatchRequestContainer from "./common/containers/matchRequestContainer.js";

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
