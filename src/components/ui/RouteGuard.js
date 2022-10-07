import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const PageLoader = () => <div>Loading...</div>;

export default function RouteGuard({ loginPath, homePath, children }) {
  const session = useSelector(({ session }) => session);
  const location = useLocation();
  const navigate = useNavigate();

  const getPagePermission = (pathname, session) => {
    if (pathname === loginPath) {
      return !session.authenticated;
    }

    return session.authenticated && session.user;
  };

  function authCheck() {
    // Only handle on client side
    // Get page permission
    const isAllowed = getPagePermission(location.pathname, session);

    if (!isAllowed) {
      if (session.authenticated) {
        navigate(homePath);
      } else {
        // Handle for unauthenticated user
        if (location.pathname !== loginPath) {
          navigate(loginPath);
        }
      }
    }
  }

  useEffect(authCheck, [session, location.pathname]);

  return children;
}
