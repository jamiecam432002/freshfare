import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <div className="border-grey-100 row-span-full flex flex-col gap-[3.2rem] border-r border-solid px-8 py-10">
      <Logo />
      <MainNav />
    </div>
  );
}
