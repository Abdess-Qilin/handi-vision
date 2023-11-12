// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { isAuthenticated } from './Auth.js';
// import ErrorBoundary from '../../ViewsDefault/ErrorBoundary/ErrorBoundary.js';

// const PrivateRoute = ({ path, element }) => {
//   const isUserAuthenticated = isAuthenticated();

//   return isUserAuthenticated ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/" />
//   );
// };

// export default function WrappedPrivateRoute({ path, element }) {
//   return (
//     <>
//     <ErrorBoundary>
//       <PrivateRoute path={path} element={element} />
//     </ErrorBoundary>
//     </>
//   );
// }
