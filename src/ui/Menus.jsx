import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}
function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <button
      onClick={handleClick}
      className="translate-x-[0.8rem] rounded-[--border-radius-sm] border-0 px-[0.4rem] py-[0.4rem] transition-all duration-200 hover:bg-[--color-grey-100] [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:text-[#9ca3af]"
    >
      <HiEllipsisVertical />
    </button>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  if (openId !== id) return;

  return createPortal(
    <ListWindow position={position}>{children}</ListWindow>,
    document.body,
  );
}

function ListWindow({ children, position }) {
  const { close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  const { x, y } = position;

  return (
    <ul
      ref={ref}
      style={{ right: `${x}px`, top: `${y}px` }}
      className={`fixed rounded-[--border-radius-md] bg-[--color-grey-0] shadow-md`}
    >
      {children}
    </ul>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-[1.6rem] border-0 bg-none px-[2.4rem] py-[1.2rem] text-left text-[1.4rem] transition-all duration-200 hover:bg-[--color-grey-50] [&_svg]:h-[1.6rem] [&_svg]:w-[1.6rem] [&_svg]:text-[#9ca3af] [&_svg]:transition-all [&_svg]:duration-300"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.ListWindow = ListWindow;

export default Menus;
