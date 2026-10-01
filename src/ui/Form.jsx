export default function Form({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-grey-100 bg-grey-0 overflow-hidden rounded-sm px-0 py-0 text-[1.4rem]"
    >
      {children}
    </form>
  );
}
