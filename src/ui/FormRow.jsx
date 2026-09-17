export default function FormRow({ children, fieldName }) {
  return (
    <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-10 border-b border-gray-100 px-0 py-5 last:border-b-0">
      <label htmlFor={fieldName} className="text-[1.4rem] font-medium">
        {fieldName}
      </label>
      {children}
    </div>
  );
}
