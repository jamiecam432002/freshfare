export default function Form({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="text-[1.4rem overflow-hidden rounded-sm border-[--color-grey-100] bg-[--color-grey-0] px-[4rem] py-[2.4rem]"
    >
      {children}
    </form>
  );
}
