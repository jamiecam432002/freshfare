export default function Button({ children, onClick }) {
  return (
    <button
      className="rounded-md border-0 bg-[--color-brand-600] px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[--color-brand-50] shadow-sm hover:bg-[--color-brand-700]"
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
}
