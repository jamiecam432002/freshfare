import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] h-screen w-full bg-[var(--backdrop-color)] backdrop-blur-[4px] transition-all duration-500">
      <div
        ref={ref}
        className="bg-grey-0 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-10 py-8 shadow-lg transition-all duration-500"
      >
        <Button
          onClick={close}
          className="absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] rounded-[var(--border-radius-sm)] border-0 bg-transparent p-[0.4rem] transition-all duration-200 hover:bg-[var(--color-grey-100)] [&_svg]:size-[2.4rem] [&_svg]:text-[var(--color-grey-500)]"
        >
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;
