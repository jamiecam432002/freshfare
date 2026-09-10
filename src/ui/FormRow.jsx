export default function FormRow({ children, fieldName }) {
  return (
    <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-10 px-0 py-5">
      <label htmlFor={fieldName} className="font-medium">
        {fieldName}
      </label>
      {children}
    </div>
  );
}
