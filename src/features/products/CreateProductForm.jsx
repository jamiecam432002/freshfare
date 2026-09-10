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

export default function CreateProductForm({ productToEdit = {} }) {
  const { id, ...editValues } = productToEdit;
  const isEditing = Boolean(id);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: suppliers = [] } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: isEditing ? editValues : {},
  });

  async function onSubmit(formData) {
    if (formData.id !== "") {
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
    },
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("product was successfully created");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      reset();
    },
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
          className="rounded-sm border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] shadow-sm"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </FormRow>
      <FormRow fieldName="description">
        <input
          type="text"
          id="description"
          disabled={isSubmitting}
          {...register("description", {
            required: "Description is required",
          })}
          className="rounded-sm border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] shadow-sm"
        />
        {errors.description && <p>{errors.description.message}</p>}
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
          className="rounded-sm border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] shadow-sm"
        />
        {errors.quantity && <p>{errors.quantity.message}</p>}
      </FormRow>
      <FormRow fieldName="sku">
        <input
          type="text"
          id="sku"
          disabled={isSubmitting}
          {...register("sku", {
            required: "Product SKU is required",
          })}
          className="rounded-sm border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] shadow-sm"
        />
        {errors.sku && <p>{errors.sku.message}</p>}
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
          className="rounded-sm border-[--color-grey-300] bg-[--color-grey-0] px-[1.2rem] py-[0.8rem] shadow-sm"
        />
        {errors.price && <p>{errors.price.message}</p>}
      </FormRow>
      <FormRow fieldName="category_id">
        <select
          id="category_id"
          disabled={isSubmitting}
          {...register("category_id", {
            required: "Please select a category",
          })}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option id={category.id} value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p>{errors.category_id.message}</p>}
      </FormRow>

      <FormRow fieldName="supplier_id">
        <select
          id="supplier_id"
          disabled={isSubmitting}
          {...register("supplier_id", {
            required: "Please select a supplier",
          })}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option id={supplier.id} value={supplier.id} key={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        {errors.supplier_id && <p>{errors.supplier_id.message}</p>}
      </FormRow>
      <FormRow fieldName="active">
        <select
          id="active"
          disabled={isSubmitting}
          {...register("active", {
            required: "Set the products ACTIVE status",
          })}
        >
          <option value="">Set Active Status</option>
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
        {errors.active && <p>{errors.active.message}</p>}
      </FormRow>

      <input type="hidden" id="id" value={id} {...register("id")} />

      <FormRow>
        <Button disabled={isSubmitting}>
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </FormRow>
    </Form>
  );
}
