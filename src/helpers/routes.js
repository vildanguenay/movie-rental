import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export function IsUserRedirect({ user, loggedInPath, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Navigate
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ user, children, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Navigate
              to={{
                pathname: 'login',
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
