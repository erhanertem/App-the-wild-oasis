import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Account from './pages/Account';
import PageNotFound from './pages/PageNotFound';
import Users from './pages/Users';

function App() {
  return (
    <>
      {/* Provide global styled-components */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
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
            path="login"
            element={<Login />}
          />
          <Route
            path="account"
            element={<Account />}
          />
          {/* Handle undefined routes */}
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
