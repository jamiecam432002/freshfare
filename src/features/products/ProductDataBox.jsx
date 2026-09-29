import { HiOutlineHomeModern } from "react-icons/hi2";

export default function ProductDataBox({ product }) {
  const {
    name,
    price,
    status,
    quantity,
    description,
    category: { name: categoryName },
    supplier: { name: supplierName },
  } = product;
  return (
    <section className="overflow-hidden rounded-md border bg-[--color-grey-0]">
      <header className="flex items-center justify-between bg-[--color-brand-500] px-[4rem] py-[2rem] text-[1.8rem] font-medium text-[#e0e7ff] [&_svg]:h-[3.2rem] [&_svg]:w-[3.2rem]">
        <div>
          <HiOutlineHomeModern />
          <p>{name}</p>
          <p>{description}</p>
          <p>${price}</p>
          <p>{status}</p>
          <p>{quantity}</p>
        </div>
        <p>{categoryName}</p>
        <p>Supplier: {supplierName}</p>
      </header>
    </section>
  );
}
