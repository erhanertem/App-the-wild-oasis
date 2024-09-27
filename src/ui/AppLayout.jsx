import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <p>APP LAYOUT</p>
      <Outlet />
    </div>
  );
}

export default AppLayout;
