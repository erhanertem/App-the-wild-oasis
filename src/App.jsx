import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dashboard from './pages/Dashboard';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Account from './pages/Account';
import PageNotFound from './pages/PageNotFound';
import Users from './pages/Users';
import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// > #1. SETUP TANSTACK QUERY CLIENT W/CACHING SUPPORT
const queryClient = new QueryClient({
  // Query Client configuration
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    // > #2. PROVIDE TANSTACK QUERY CLIENT
    <QueryClientProvider client={queryClient}>
      {/* QUERY DEVTOOLS */}
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition={'bottom-left'}
        position={'bottom'}
      />
      {/* Provide global styled-components */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
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
            element={<Login />}
          />
          {/* Handle undefined routes */}
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
