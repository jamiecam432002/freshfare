import Logo from './Logo';
import MainNav from './MainNav';

export default function Sidebar() {
	return (
		<div className='py-[3.2rem] px-[2.4rem] flex flex-col border-r border-solid border-[#f3f4f6] gap-[3.2rem] row-span-full'>
			<Logo />
			<MainNav />
		</div>
	);
}
