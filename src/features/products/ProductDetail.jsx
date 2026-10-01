import { useMoveBack } from "../../hooks/useMoveBack";
import { useProduct } from "./hooks/useProduct";
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
          <h1 className="text-[3rem] leading-5 font-semibold">Product #{id}</h1>
        </div>
        <button
          onClick={() => moveBack()}
          className="text-brand-600 hover:text-brand-700 active:text-brand-700 rounded-sm border-0 bg-none text-center font-medium transition-all"
        >
          &larr; Back
        </button>
      </div>
      <ProductDataBox product={product} />
    </>
  );
}
