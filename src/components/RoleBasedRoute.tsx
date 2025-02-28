import React from "react";
import { Route, Navigate } from "react-router-dom";

interface RoleBasedRouteProps {
  component: React.ComponentType<any>;
  roles: string[];
  path: string;
  exact?: boolean;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  component: Component,
  roles,
  ...rest
}) => {
  const currentUser = { role: "admin" };

  return (
    <Route
      {...rest}
      element={
        !currentUser ? (
          <Navigate to="/login" />
        ) : !roles.includes(currentUser.role) ? (
          <Navigate to="/unauthorized" />
        ) : (
          <Component />
        )
      }
    />
  );
};

export default RoleBasedRoute;