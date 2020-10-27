import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({
  component: Component,
  redirectPath,
  setRedirectPath,
  ...params
}) {

  const redirectAndReset = () => {
      setRedirectPath("");
      return (
        <Redirect to={redirectPath} />
      );
  }
  return (
    <Route
      {...params}
      render={(props) => {
        return !redirectPath || params.path === redirectPath ? (
          <Component {...props} />
        ) : redirectAndReset();
      }}
    />
  );
}

export default PrivateRoute;
