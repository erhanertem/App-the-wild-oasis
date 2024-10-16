import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "./Spinner";

import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // > #1.Load Authenticated User
  const { isLoadingCurrentUser, isAuthenticated } = useUser();

  // > #2.If there is No authenticated user, redirect to the /login endpoint
  useEffect(() => {
    if (!isAuthenticated && !isLoadingCurrentUser) navigate("/login");
  }, [isAuthenticated, isLoadingCurrentUser, navigate]);

  // > #3.While loading, show a spinner
  if (isLoadingCurrentUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // > #4. If there is an authenticated user, render the children prop (the component that needs to be protected - rest of the app)
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
