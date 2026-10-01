import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <div className="flex justify-center text-center">
      <NavLink to="/dashboard">
        <img className="h-[9rem] w-auto" src="/freshfare.png" alt="FreshFare" />
      </NavLink>
    </div>
  );
}
