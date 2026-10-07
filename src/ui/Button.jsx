export default function Button({ children, onClick, variation, type }) {
  let btnStyles;
  if (variation === "primary")
    btnStyles = `flex items-center gap-4 rounded-md border-0 bg-brand-600 px-[2.4rem] py-[1.2rem] text-[1.4rem] text-brand-50 shadow-sm hover:bg-brand-700`;
  else if (variation === "close")
    btnStyles = `absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] rounded-md border-0 bg-transparent p-[0.4rem] transition-all duration-200 hover:bg-grey-100 [&_svg]:size-[2.4rem] [&_svg]:text-grey-500`;
  else if (variation === "danger")
    btnStyles = `px-[1.6rem] py-[1.2rem] rounded-md border-0 bg-red-700 text-red-100 text-[1.4rem] shadow-sm hover:bg-red-800`;
  else
    btnStyles = `flex px-[1.6rem] py-[1.2rem] rounded-md border-1 border-grey-300 bg-grey-0 px-[2.4rem] py-[1.2rem] text-[1.4rem] text-grey-600 hover:bg-grey-50`;
  return (
    <button className={btnStyles} onClick={onClick} type={type || "submit"}>
      {children}
    </button>
  );
}
