import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { getCategories } from "../../services/apiCategories";
import { getSuppliers } from "../../services/apiSuppliers";
import { createProduct, updateProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function CreateProductForm({
  onCloseModal,
  productToEdit = {},
}) {
  const { id: editId, ...editValues } = productToEdit;
  const isEditing = Boolean(editId);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: suppliers } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: isEditing ? editValues : {},
  });

  useEffect(() => {
    if (!categories || !suppliers) return;
    reset();
  }, [categories, suppliers, reset]);

  const queryClient = useQueryClient();

  async function onSubmit(formData) {
    if (formData.id !== "") {
      console.log("id is present");
      updateProductMutation.mutate(formData);
    } else {
      createProductMutation.mutate(formData);
    }
  }

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("product was successfully saved");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      onCloseModal?.();
    },
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product was successfully created");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      reset();
      onCloseModal?.();
    },
    onError: (err) => toast.error(err.message),
  });

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
          className="rounded-sm border border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-sm"
        />
        {errors.name && (
          <span className="text-[1.4rem] text-[--color-red-700]">
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
          className="rounded-sm border border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-sm"
        />
        {errors.description && (
          <span className="text-[1.4rem] text-[--color-red-700]">
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
          className="rounded-sm border border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-sm"
        />
        {errors.quantity && (
          <span className="text-[1.4rem] text-[--color-red-700]">
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
          })}
          className="rounded-sm border border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-sm"
        />
        {errors.sku && (
          <span className="text-[1.4rem] text-[--color-red-700]">
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
          className="rounded-sm border border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-sm"
        />
        {errors.price && (
          <span className="text-[1.4rem] text-[--color-red-700]">
            {errors.price.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="category_id">
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
          <span className="text-[1.4rem] text-[--color-red-700]">
            {errors.category_id.message}
          </span>
        )}
      </FormRow>

      <FormRow fieldName="supplier_id">
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
          <span className="text-[1.4rem] text-[--color-red-700]">
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
            required: "Set the products ACTIVE status",
          })}
        >
          <option value="">Set Active Status</option>
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
        {errors.active && (
          <span className="text-[1.4rem] text-[--color-red-700]">
            {errors.active.message}
          </span>
        )}
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
