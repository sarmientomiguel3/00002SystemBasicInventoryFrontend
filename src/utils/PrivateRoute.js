import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  console.log(getToken());
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Navigate to="/login" /> : <Navigate to="/login" />}
    />
  )
}
 
export default PrivateRoute;
