import React from "react";
import "./App.css";
import HomeContainer from "./pages/home/containers/homeContainer.js";
import MainLayoutContainer from "./pages/main/containers/mainLayoutContainer.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProfilLayoutContainer from "./pages/profile/containers/profilLayoutContainer.js";
import ConfirmationContainer from "./pages/home/containers/confirmationContainer.js";
import BackdropLoaderContainer from "./common/containers/backdropLoaderContainer.js";
import SnackBarContainer from "./common/containers/snackBarContainer.js";
import PasswordChangeContainer from "./pages/home/containers/passwordChangeContainer.js";
import PrivateRouteContainer from "./common/containers/privateRouteContainer";

function App() {
  return (
    <div className="App">
      {/* <MainLayout /> */}
      <Router>
        <Switch>
          <PrivateRouteContainer
            exact
            path="/login"
            component={HomeContainer}
          />
          <PrivateRouteContainer
            exact
            path="/"
            component={MainLayoutContainer}
          />
          <PrivateRouteContainer
            exact
            path="/profil"
            component={ProfilLayoutContainer}
          />
          <Route
            exact
            path={["/confirmation/:token", "/reset/:token"]}
            component={ConfirmationContainer}
          />
          <Route
            exact
            path="/reset-password"
            component={PasswordChangeContainer}
          />
        </Switch>
      </Router>
      <BackdropLoaderContainer />
      <SnackBarContainer />
    </div>
  );
}

export default App;
