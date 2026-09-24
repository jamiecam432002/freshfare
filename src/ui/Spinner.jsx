export default function Spinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-[6rem] w-[6rem] animate-[spin_1.5s_linear_infinite] rounded-[50%] bg-[conic-gradient(#0000_10%,var(--color-brand-500))] [-webkit-mask:radial-gradient(farthest-side,#0000_calc(100%-8px),#000_0)]"></div>
    </div>
  );
}
