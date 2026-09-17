export default function Button({ children, onClick, variation, type }) {
  let btnStyles;
  if (variation === "primary")
    btnStyles = `rounded-md border-0 bg-[--color-brand-600] px-[2.4rem] py-[1.2rem] text-[1.4rem] text-[--color-brand-50] shadow-sm hover:bg-[--color-brand-700]`;
  else if (variation === "close")
    btnStyles = `absolute right-[1.9rem] top-[1.2rem] translate-x-[0.8rem] rounded-[var(--border-radius-sm)] border-0 bg-transparent p-[0.4rem] transition-all duration-200 hover:bg-[var(--color-grey-100)] [&_svg]:size-[2.4rem] [&_svg]:text-[var(--color-grey-500)]`;
  else
    btnStyles = `rounded-md border border-gray-300 bg-[--color-grey-0] px-[2.4rem] py-[1.2rem] text-[1.4rem] text-[--color-gray-600] shadow-sm hover:bg-[--color-grey-50]`;
  return (
    <button className={btnStyles} onClick={onClick} type={type || "submit"}>
      {children}
    </button>
  );
}
