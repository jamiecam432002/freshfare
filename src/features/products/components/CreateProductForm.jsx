import { useForm } from "react-hook-form";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";
import { useEffect } from "react";
import { useSuppliers } from "@/features/suppliers/hooks/useSuppliers";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSaveProduct } from "../hooks/useProductMutations";

export default function CreateProductForm({
  onCloseModal,
  productToEdit = {},
}) {
  const { id: editId, ...editValues } = productToEdit;
  const isEditing = Boolean(editId);

  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();
  const { mutateAsync: saveProductMutation, isPending } = useSaveProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: isEditing
      ? { ...editValues, active: editValues?.active ?? true }
      : {},
  });

  useEffect(() => {
    if (!categories || !suppliers) return;
    reset();
  }, [categories, suppliers, reset]);

  async function onSubmit(formData) {
    const { imageFile, ...values } = formData;

    try {
      await saveProductMutation({
        id: editId,
        values,
        imageFile: imageFile?.[0],
      });

      reset();
      onCloseModal?.();
    } catch (error) {
      console.error(error.message);
    }
    /* if (isEditing) {
      updateProductMutation.mutate(formData);
    } else {
      createProductMutation.mutate(formData);
    } */
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow fieldName="name">
        <input
          type="text"
          id="name"
          disabled={isSubmitting}
          {...register("name", {
            required: "Product name is required",
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.name && (
          <span className="text-[1.4rem] text-red-700">
            {errors.name.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="description">
        <input
          type="text"
          id="description"
          disabled={isSubmitting}
          {...register("description", {
            required: "Description is required",
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.description && (
          <span className="text-[1.4rem] text-red-700">
            {errors.description.message}
          </span>
        )}
      </FormRow>

      <FormRow fieldName="quantity">
        <input
          type="number"
          id="quantity"
          disabled={isSubmitting}
          {...register("quantity", {
            required: "Quantity is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Quantity cannot be negative",
            },
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.quantity && (
          <span className="text-[1.4rem] text-red-700">
            {errors.quantity.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="sku">
        <input
          type="text"
          id="sku"
          disabled={isSubmitting}
          {...register("sku", {
            required: "Product SKU is required",
            pattern: {
              value: /^[A-Za-z]{3}-\d{3}$/,
              message: "SKU must use the format ABC-123",
            },
            setValueAs: (value) => value.trim().toUpperCase(),
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.sku && (
          <span className="text-[1.4rem] text-red-700">
            {errors.sku.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="price">
        <input
          type="text"
          id="price"
          disabled={isSubmitting}
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: {
              value: 0.01,
              message: "Price must be greater than zero",
            },
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
        />
        {errors.price && (
          <span className="text-[1.4rem] text-red-700">
            {errors.price.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="category">
        <select
          id="category_id"
          className="text-[1.4rem]"
          disabled={isSubmitting}
          {...register("category_id", {
            required: "Please select a category",
          })}
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option id={category.id} value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <span className="text-[1.4rem] text-red-700">
            {errors.category_id.message}
          </span>
        )}
      </FormRow>

      <FormRow fieldName="supplier">
        <select
          id="supplier_id"
          className="text-[1.4rem]"
          disabled={isSubmitting}
          {...register("supplier_id", {
            required: "Please select a supplier",
          })}
        >
          <option value="">Select Supplier</option>
          {suppliers?.map((supplier) => (
            <option id={supplier.id} value={supplier.id} key={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        {errors.supplier_id && (
          <span className="text-[1.4rem] text-red-700">
            {errors.supplier_id.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="active">
        <select
          id="active"
          className="text-[1.4rem]"
          disabled={isSubmitting}
          {...register("active", {
            setValueAs: (value) => {
              if (value === true || value === "true") return true;
              if (value === false || value === "false") return false;
              return undefined;
            },
            validate: (value) =>
              typeof value === "boolean" || "please select a status",
          })}
        >
          <option value="">Set Active Status</option>
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
        {errors.active && (
          <span className="text-[1.4rem] text-red-700">
            {errors.active.message}
          </span>
        )}
      </FormRow>

      <FormRow fieldName="product-image">
        <input
          id="product-image"
          type="file"
          accept="image/webp, image/png, image/jpeg"
          {...register("imageFile", {
            validate: (files) => {
              const file = files?.[0];

              if (!file) return true;
              if (file.size > 2 * 1024 * 1024) {
                return "Image must be smaller than 2MB";
              }

              if (
                !["image/webp", "image/png", "image/jpeg"].includes(file.type)
              ) {
                return "unsupported image format";
              }
              return true;
            },
          })}
        />
        {errors.productImage && <p>{errors.productImage.message}</p>}
      </FormRow>

      <input type="hidden" id="id" value={editId} {...register("id")} />

      <div className="flex justify-end gap-5 px-[0] pt-[1.2rem]">
        <Button type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variation="primary" disabled={isSubmitting}>
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </Form>
  );
}
