import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AppLayout() {
	return (
		<div>
			<Header />
			<Sidebar />
			<main>
				{/* Outlet help us use children routes inside this AppLayout route */}
				{/* Whatever comes from the pages are remains inside the main */}
				<Outlet />
			</main>
		</div>
	);
}

export default AppLayout;
