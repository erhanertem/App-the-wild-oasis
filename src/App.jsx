import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import AuthRoute from "./ui/AuthRoute";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

// > #1. SETUP TANSTACK QUERY CLIENT W/CACHING SUPPORT
const queryClient = new QueryClient({
  // Query Client configuration
  defaultOptions: {
    queries: {
      // staleTime: 30 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      {/* // > #2. PROVIDE TANSTACK QUERY CLIENT */}
      <QueryClientProvider client={queryClient}>
        {/* QUERY DEVTOOLS */}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition={"bottom-left"}
          position={"bottom"}
        />
        {/* Provide global styled-components */}

        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  {/* Applayout wraps all our endpoints. So wrapping Applayout component by ProtectedRoute help us protect the Outlet/children components as well automatically */}
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Redirecting from root to /dashboard */}
              <Route
                index
                element={
                  // Used Navigate component to not dublicate <Dashboard/> component
                  // replace attribute ensures this redirect action replaces the current entry in the history to prevent user from going back
                  // to points to route that handles <Dashboard/> component
                  <Navigate
                    replace
                    to="dashboard"
                  />
                }
              />
              {/* Main routes */}
              <Route
                path="dashboard"
                element={<Dashboard />}
              />
              <Route
                path="bookings"
                element={<Bookings />}
              />
              <Route
                path="bookings/:bookingId"
                element={<Booking />}
              />
              <Route
                path="checkin/:bookingId"
                element={<Checkin />}
              />
              <Route
                path="cabins"
                element={<Cabins />}
              />
              <Route
                path="settings"
                element={<Settings />}
              />
              <Route
                path="users"
                element={<Users />}
              />
              <Route
                path="account"
                element={<Account />}
              />
            </Route>

            {/* THESE ROUTES BELOW DOES NOT NEED TO DISPLAY APPLAYOUT */}

            <Route
              path="login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />

            {/* Handle undefined routes */}
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 4000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
