import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

export default function Modal({ children }) {
  // create a piece of state to track WHICH modal is open
  const [openName, setOpenName] = useState("");
  // create a close function to be made accessible to child components
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
    <div className="fixed inset-0 z-1000 h-screen w-full bg-[--backdrop-color] backdrop-blur-xs transition-all duration-500">
      <div
        ref={ref}
        className="bg-grey-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-[4rem] py-[3.2rem] shadow-lg transition-all duration-500"
      >
        <Button
          onClick={close}
          className="hover:bg-color-grey-100 absolute top-[1.2rem] right-[1.9rem] translate-x-[0.8rem] rounded-[--border-radius-sm] border-0 bg-transparent p-[0.4rem] transition-all duration-200 [&_svg]:size-[2.4rem] [&_svg]:text-[--color-grey-500]"
          variation="close"
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
