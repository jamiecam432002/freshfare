import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-[100vh] grid-cols-[23rem_1fr]">
      <Sidebar />
      <main className="bg-gray-50 pb-[6.4rem] pl-[4rem] pr-[4rem] pt-[4rem]">
        <div className="my-0 flex max-w-[144rem] flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
