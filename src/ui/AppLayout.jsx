import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout() {
	return (
		<div className='grid h-[100vh] grid-cols-[26rem_1fr] grid-rows-[auto_1fr]'>
			<Header />
			<Sidebar />
			<main className='bg-gray-50 pt-[4rem] pr-[4.8rem] pb-[6.4rem] pl-[4.8rem]'>
				<div className='max-w-[120rem] mx-auto my-0 flex flex-col gap-[3.2rem]'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}
