import { useForm } from "react-hook-form";
import useAdjustStock from "./useAdjustStock";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Button from "@/ui/Button";

export default function AdjustStockForm({ product, onCloseModal }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      direction: "add",
      quantity: 1,
      reason: "restock",
      notes: "",
    },
  });
  const { mutateAsync: adjustStock, isPending, error } = useAdjustStock();

  const direction = watch("direction");
  const quantity = Number(watch("quantity")) || 0;

  const currentStock = Number(product.quantity);
  const projectedStock =
    currentStock + (direction === "add" ? quantity : -quantity);

  async function onSubmit(values) {
    const delta =
      values.direction === "add" ? values.quantity : -values.quantity;

    try {
      await adjustStock({
        productId: product.id,
        quantityChange: delta,
        reason: values.reason,
        notes: values.notes,
      });
      reset();
      onCloseModal?.();
    } catch (error) {
      // the mutation error is displayed below
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isPending}>
        <h2 className="mb-2 text-5xl font-bold">Adjust Stock</h2>
        <p className="mb-6 text-2xl font-medium">{product.name}</p>

        <FormRow fieldName="direction" label="Adjustment Type">
          <select
            id="direction"
            className="text-[1.4rem]"
            {...register("direction", {
              onChange: (event) => {
                console.log(event);
                setValue(
                  "reason",
                  event.target.value === "add" ? "restock" : "sale",
                );
              },
            })}
          >
            <option value="add">Add Stock</option>
            <option value="remove">Remove Stock</option>
          </select>
        </FormRow>
        <FormRow fieldName="quantity" label="Quantity">
          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            {...register("quantity", {
              valueAsNumber: true,
              required: "Quantity is required",
              min: {
                value: 1,
                message: "minimum quantity is 1",
              },
              validate: {
                integer: (value) =>
                  Number.isInteger(value) || "Quantity must be a whole number",
                available: (value) =>
                  direction !== "remove" ||
                  value <= currentStock ||
                  "insufficient stock",
              },
            })}
          />
          {errors.quantity && <p role="alert">{errors.quantity.message}</p>}
        </FormRow>

        <FormRow fieldName="reason" label="Reason">
          <select id="reason" className="text-[1.4rem]" {...register("reason")}>
            {direction === "add" ? (
              <>
                <option value="restock">New delivery</option>
                <option value="correction">Inventory correction</option>
              </>
            ) : (
              <>
                <option value="sale">Sale</option>
                <option value="damage">Damaged goods</option>
                <option value="correction">Inventory correction</option>
              </>
            )}
          </select>
        </FormRow>
        <FormRow fieldName="notes" label="Notes">
          <textarea id="notes" {...register("notes")} />
        </FormRow>
        <p className="text-[1.4rem] font-medium">
          Projected stock after adjustment: <span>{projectedStock}</span> units
        </p>
        {error && <p role="alert">{error.message}</p>}
        <div className="flex justify-end gap-5 px-[0] pt-[1.2rem]">
          <Button type="reset" onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button type="submit" variation="primary">
            {isPending ? "Saving..." : "Confirm Adjustment"}
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}
