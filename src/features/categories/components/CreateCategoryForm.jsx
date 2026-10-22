import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Button from "../../../ui/Button";
import { useForm } from "react-hook-form";
import { useSaveCategory } from "../hooks/useCategoryMutations";

export default function CreateCategoryForm({
  onCloseModal,
  categoryToEdit = {},
}) {
  const { id: editId, ...editValues } = categoryToEdit;
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

  const { mutateAsync: saveCategoryMutation } = useSaveCategory();

  async function onSubmit(formData) {
    const { imageFile, ...values } = formData;
    try {
      await saveCategoryMutation({
        id: editId,
        values,
        imageFile: imageFile?.[0],
      });

      reset();
      onCloseModal?.();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow fieldName="name">
        <input
          type="text"
          id="name"
          {...register("name", { required: "Category name is required" })}
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
            required: "Category description is required",
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
            setValueAs: (value) => {
              if (value === true || value === "true") return true;
              if (value === false || value === "false") return false;
              return undefined;
            },
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
      <FormRow fieldName="category-image">
        <input
          id="category-image"
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
      <div className="flex justify-end gap-5 px-0 pt-[1.2rem]">
        <Button type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variation="primary" disabled={isSubmitting}>
          {isEditing ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </Form>
  );
}
