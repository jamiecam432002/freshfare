export default function Button({ children, onClick, variation, type }) {
  let btnStyles;
  if (variation === "primary")
    btnStyles = `rounded-md border-0 bg-[--color-brand-600] px-[2.4rem] py-[1.2rem] text-[1.4rem] text-[--color-brand-50] shadow-sm hover:bg-[--color-brand-700]`;
  else if (variation === "close")
    btnStyles = `absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] rounded-md border-0 bg-transparent p-[0.4rem] shadow-sm transition-all duration-200 hover:bg-[var(--color-grey-100)] [&_svg]:size-[2.4rem] [&_svg]:text-[var(--color-grey-500)]`;
  else if (variation === "danger")
    btnStyles = `px-[1.6rem] py-[1.2rem] rounded-md border-0 bg-[--color-red-700] text-[--color-red-100] text-[1.4rem] shadow-sm hover:bg-[--color-red-800]`;
  else if (variation === "secondary")
    btnStyles = `px-[1.6rem] py-[1.2rem] rounded-md border border-[--color-grey-200] bg-[--color-grey-0] text-[--color-grey-600] text-[1.4rem] shadow-sm hover:bg-[--color-grey-50]`;
  else
    btnStyles = `px-[1.6rem] py-[1.2rem] rounded-md border-0 border-grey-300 bg-[--color-grey-0] px-[2.4rem] py-[1.2rem] text-[1.4rem] text-[--color-grey-600] shadow-sm hover:bg-[--color-grey-50]`;
  return (
    <button className={btnStyles} onClick={onClick} type={type || "submit"}>
      {children}
    </button>
  );
}
