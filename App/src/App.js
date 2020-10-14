import React from "react";
import "./App.css";
import HomeContainer from "./pages/home/containers/homeContainer.js";
import MainLayoutContainer from "./pages/main/containers/mainLayoutContainer.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profil from "./pages/profile/components/profil.js";
import MatchRequestContainer from "./common/containers/matchRequestContainer.js";
import ConfirmationContainer from "./pages/home/containers/confirmationContainer.js";
import BackdropLoaderContainer from "./common/containers/backdropLoaderContainer.js";
function App({ user }) {
  const [con, setcon] = React.useState(false);
  React.useEffect(() => {
    setcon(!!localStorage.getItem("x-token"));
  });
  return (
    <div className="App">
      {/* <MainLayout /> */}
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={!con ? HomeContainer : MainLayoutContainer}
          />
          <Route exact path="/profil" component={Profil} />
          <Route
            exact
            path="/confirmation/:token"
            component={ConfirmationContainer}
          />
        </Switch>
      </Router>
      {/* <Home /> */}
      <MatchRequestContainer />
      <BackdropLoaderContainer />
    </div>
  );
}

export default App;
