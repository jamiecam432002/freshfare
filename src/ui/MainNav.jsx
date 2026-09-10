import { NavLink } from 'react-router-dom';
import {
	HiOutlineHome,
	HiOutlineCalendarDays,
	HiOutlineHomeModern,
} from 'react-icons/hi2';

export default function MainNav() {
	return (
		<nav>
			<ul className='flex flex-col gap-[0.8rem]'>
				<li>
					<NavLink
						to='/dashboard'
						className='flex gap-[1.2rem] items-center text-2xl font-medium py-[1.2rem] px-[2.4rem] text-[#4b5563]'>
						<HiOutlineHome className='w-[2rem] h-[2rem] text-[#9ca3af]' />
						<span>Home</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/inventory'
						className='flex gap-[1.2rem] items-center text-2xl font-medium py-[1.2rem] px-[2.4rem] text-[#4b5563]'>
						<HiOutlineCalendarDays className='w-[2rem] h-[2rem] text-[#9ca3af]' />
						<span>Inventory</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/reports'
						className='flex gap-[1.2rem] items-center text-2xl font-medium py-[1.2rem] px-[2.4rem] text-[#4b5563]'>
						<HiOutlineHomeModern className='w-[2rem] h-[2rem] text-[#9ca3af]' />
						<span>Reports</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
