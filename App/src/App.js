import React from "react";
import "./App.css";
import HomeContainer from "./pages/home/containers/homeContainer.js";
import MainLayoutContainer from "./pages/main/containers/mainLayoutContainer.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfilLayoutContainer from "./pages/profile/containers/profilLayoutContainer.js";
import MatchRequestContainer from "./common/containers/matchRequestContainer.js";
import ConfirmationContainer from "./pages/home/containers/confirmationContainer.js";
import BackdropLoaderContainer from "./common/containers/backdropLoaderContainer.js";
import SnackBarContainer from "./common/containers/snackBarContainer.js";
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
              Object.keys(user.user).length === 0
                ? HomeContainer
                : MainLayoutContainer
            }
          />
          <Route exact path="/profil" component={ProfilLayoutContainer} />
          <Route
            exact
            path="/confirmation/:token"
            component={ConfirmationContainer}
          />
        </Switch>
      </Router>
      <MatchRequestContainer />
      <BackdropLoaderContainer />
      <SnackBarContainer />
    </div>
  );
}

export default App;
