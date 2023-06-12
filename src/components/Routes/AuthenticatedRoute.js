import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from './Routes';
import React from 'react';

function AuthenticatedRoute({ path, user, component: Component, ...props }) {

  const isRoleAllowed = () => {
    const route = ROUTES.find((route) => route.path === path);
    return route ? route.role.includes(user.role) : false;
  };

  return (
    <Route
      {...props}
      render={(props) => {
        return isRoleAllowed() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" push />
        );
      }}
    />
  );

}

export { AuthenticatedRoute };
