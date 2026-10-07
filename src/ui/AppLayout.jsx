import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[23rem_1fr]">
      <Sidebar />
      <main className="bg-gray-50 pt-[4rem] pr-[4rem] pb-[6.4rem] pl-[4rem]">
        <div className="my-0 flex max-w-[144rem] flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
