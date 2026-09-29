import { useMoveBack } from "../../hooks/useMoveBack";
import { useProduct } from "./useProduct";
import Spinner from "../../ui/Spinner";
import ProductDataBox from "./ProductDataBox";

export default function ProductDetail() {
  const { product, isLoading } = useProduct();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  const { id, name, description, price, status, category, supplier } = product;
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text-[3rem] font-semibold leading-5">Product #{id}</h1>
        </div>
        <button
          onClick={() => moveBack()}
          className="rounded-sm border-0 bg-none text-center font-medium text-[--color-brand-600] transition-all hover:text-[--color-brand-700] active:text-[--color-brand-700]"
        >
          &larr; Back
        </button>
      </div>
      <ProductDataBox product={product} />
    </>
  );
}
