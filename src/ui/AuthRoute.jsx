import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetUser } from "../features/authentication/useGetUser";

import Spinner from "./Spinner";
import FullPage from "./FullPage";

function AuthRoute({ children }) {
  const navigate = useNavigate();
  const { isLoadingCurrentUser, isAuthenticated } = useGetUser();

  // If the user is authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated && isLoadingCurrentUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (!isAuthenticated) return children;
}

export default AuthRoute;
