import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';

// Parent styling
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;
// Child styling
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <Main>
        {/* Let child routes pass thru RR Outlet component - AKA contents coming from pages */}
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
