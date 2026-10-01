import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineCog8Tooth,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineWallet,
} from "react-icons/hi2";
import { Package } from "lucide-react";

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
            <Package className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/suppliers"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineUser className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Suppliers</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineSquares2X2 className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/purchasing"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineWallet className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Purchasing</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineChartBar className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Reports</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className="group flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium text-[#4b5563]"
          >
            <HiOutlineCog8Tooth className="h-[2.4rem] w-[2.4rem] text-[#9ca3af] group-[.active]:text-[--color-brand-600]" />
            <span className="text-[1.6rem]">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
