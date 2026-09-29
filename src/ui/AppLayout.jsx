import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-[100vh] grid-cols-[26rem_1fr]">
      <Sidebar />
      <main className="bg-gray-50 pb-[6.4rem] pl-[4.8rem] pr-[4.8rem] pt-[4rem]">
        <div className="mx-auto my-0 flex max-w-[120rem] flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
