import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

import styled from 'styled-components';

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				{/* Outlet help us use children routes inside this AppLayout route */}
				{/* Whatever comes from the pages remains inside the main */}
				<Outlet />
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
