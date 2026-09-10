export default function Input({ type, id }) {
  return (
    <input
      type={type}
      id={id}
      className="rounded-sm border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] shadow-sm"
    />
  );
}
