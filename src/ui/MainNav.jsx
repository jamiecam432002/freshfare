import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
} from "react-icons/hi2";

export default function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        <li>
          <NavLink
            to="/dashboard"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineHome className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineCalendarDays className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineHomeModern className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Reports</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
