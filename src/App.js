import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import { Home, Login, Signup, Browse } from './pages';

import { useAuthListener } from './hooks';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';

function App() {
  const { user } = useAuthListener();

  console.log(user);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.LOG_IN}
        >
          <Login />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}
        >
          <Signup />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.BROWSE}>
          <Browse />
        </ProtectedRoute>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
        >
          <Home />
        </IsUserRedirect>
      </Routes>
    </Router>
  );
}

export default App;
