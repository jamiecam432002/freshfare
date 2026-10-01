import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <div className="row-span-full flex flex-col gap-[3.2rem] border-r border-solid border-[#f3f4f6] px-[2rem] py-[2.5rem]">
      <Logo />
      <MainNav />
    </div>
  );
}
