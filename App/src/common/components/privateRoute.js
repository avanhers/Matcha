import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({
  component: Component,
  redirectPath,
  setRedirectPath,
  ...params
}) {
  React.useEffect(() => {
    return () => setRedirectPath("");
  }, []);
  return (
    <Route
      {...params}
      render={(props) => {
        return !redirectPath ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPath} />
        );
      }}
    />
  );
}

export default PrivateRoute;
