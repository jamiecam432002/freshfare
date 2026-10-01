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
    <section className="bg-grey-0 overflow-hidden rounded-md border">
      <header className="bg-brand-500 flex items-center justify-between px-[4rem] py-[2rem] text-[1.8rem] font-medium text-[#e0e7ff] [&_svg]:h-[3.2rem] [&_svg]:w-[3.2rem]">
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
