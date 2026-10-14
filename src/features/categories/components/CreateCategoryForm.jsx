import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Button from "../../../ui/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createCategory, updateCategory } from "@/services/apiCategories";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function CreateCategoryForm({
  onCloseModal,
  categoryToEdit = {},
}) {
  const { id: editId, ...editValues } = categoryToEdit;
  console.log(editValues.active);
  const isEditing = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: isEditing
      ? {
          name: editValues.name,
          description: editValues.description,
          active: editValues?.active ?? true,
        }
      : {},
  });

  const queryClient = useQueryClient();

  async function onSubmit(formData) {
    if (formData.id !== "") {
      console.log("id is present, must be an edit");
      updateCategoryMutation.mutate(formData);
    } else {
      createCategoryMutation.mutate(formData);
    }
  }

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("category was successfully saved");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      onCloseModal?.();
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("category was successfully created");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      reset();
      onCloseModal?.();
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow fieldName="name">
        <input
          type="text"
          id="name"
          {...register("name", { required: "Supplier name is required" })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.name && (
          <span className="text-[1.4rem] text-red-700">
            {errors.name.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="description">
        <textarea
          type="text"
          id="description"
          {...register("description", {
            required: "Supplier description is required",
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.description && (
          <span className="text-[1.4rem] text-red-700">
            {errors.description.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="active">
        <select
          id="active"
          {...register("active", {
            setValueAs: (value) => value === "true",
            validate: (value) =>
              typeof value === "boolean" || "Please select a status",
          })}
          className="text-[1.4rem]"
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
      <input type="hidden" id="id" value={editId} {...register("id")} />
      <div className="flex justify-end gap-5 px-0 pt-[1.2rem]">
        <Button type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variation="primary" disabled={isSubmitting}>
          Create Category
        </Button>
      </div>
    </Form>
  );
}
