import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// > queryClient sets up the cache behind the scene
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 6 * 1000, //Time the cache will stay fresh till next re-fetch
      staleTime: 0, //Time the cache will stay fresh till next re-fetch
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      {/* NOTE : WE ARE NOT USING REACT-ROUTER'S DATA LOADING FEATURE WITHIN THIS APP, SO WE GO AHEAD WITH THE TRADITIONAL REACT-ROUTER SETUP */}
      <BrowserRouter>
        <Routes>
          {/* AppLayout is the page(component shared across all routes - displayed with them) */}
          {/* Note that this is a layout route because it doesn't have path */}
          <Route element={<AppLayout />}>
            {/* <Route index element={<Dashboard />} />  WE CAN'T INDEX THE DASHBOARD LIKE THIS, IT WOULD DEFAULT TO '/' ROUTE BUT WE WANT /DASHBOARD SO WE NEED TO PROGRRAMATICALLY REDIRECT TO DASHBOARD. NAVIGATE COMPONENT IS USED IN THIS REGARD. */}
            {/* This is the default page we want to see whenever we launch */}
            <Route
              index
              element={
                <Navigate
                  replace
                  to="dashboard"
                />
              }
            />
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
            <Route
              path="bookings"
              element={<Bookings />}
            />
            <Route
              path="cabins"
              element={<Cabins />}
            />
            <Route
              path="users"
              element={<Users />}
            />
            <Route
              path="settings"
              element={<Settings />}
            />
            <Route
              path="account"
              element={<Account />}
            />
          </Route>

          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>

      {/* Per docs, it has to be provided at the top level above all pages */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
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
  );
}

export default App;
