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
            className="group text-grey-600 flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium"
          >
            <HiOutlineHome className="text-grey-400 group-[.active]:text-brand-600 h-[2.4rem] w-[2.4rem]" />
            <span className="text-[1.6rem]">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className="group text-grey-600 flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium"
          >
            <Package className="text-grey-400 group-[.active]:text-brand-600 h-[2.4rem] w-[2.4rem]" />
            <span className="text-[1.6rem]">Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/suppliers"
            className="group text-grey-600 flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium"
          >
            <HiOutlineUser className="text-grey-400 group-[.active]:text-brand-600 h-[2.4rem] w-[2.4rem]" />
            <span className="text-[1.6rem]">Suppliers</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className="group text-grey-600 flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium"
          >
            <HiOutlineSquares2X2 className="text-grey-400 group-[.active]:text-brand-600 h-[2.4rem] w-[2.4rem]" />
            <span className="text-[1.6rem]">Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/purchasing"
            className="group text-grey-600 flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium"
          >
            <HiOutlineWallet className="text-grey-400 group-[.active]:text-brand-600 h-[2.4rem] w-[2.4rem]" />
            <span className="text-[1.6rem]">Purchasing</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            className="group text-grey-600 flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium"
          >
            <HiOutlineChartBar className="text-grey-400 group-[.active]:text-brand-600 h-[2.4rem] w-[2.4rem]" />
            <span className="text-[1.6rem]">Reports</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className="group text-grey-600 flex items-center gap-[1.2rem] px-[2.4rem] py-[1.2rem] text-2xl font-medium"
          >
            <HiOutlineCog8Tooth className="text-grey-400 group-[.active]:text-brand-600 h-[2.4rem] w-[2.4rem]" />
            <span className="text-[1.6rem]">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
