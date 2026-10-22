import { useForm } from "react-hook-form";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Button from "../../../ui/Button";
import { useSaveSupplier } from "../hooks/useSupplierMutations";

export default function CreateSupplierForm({
  onCloseModal,
  supplierToEdit = {},
}) {
  const { id: editId, ...editValues } = supplierToEdit;
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
          email: editValues.email,
          phone: editValues.phone,
          contact: editValues["contact_name"],
          active: editValues?.active ?? true,
        }
      : {},
  });
  const { mutateAsync: saveSupplierMutation } = useSaveSupplier();

  async function onSubmit(formData) {
    const { imageFile, ...values } = formData;
    try {
      await saveSupplierMutation({
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
          {...register("name", { required: "Supplier name is required" })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.name && (
          <span className="text-[1.4rem] text-red-700">
            {errors.name.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="contact">
        <input
          type="text"
          id="contact"
          {...register("contact", {
            required: "A valid contact name is required",
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.contact && (
          <span className="text-[1.4rem] text-red-700">
            {errors.contact.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="email">
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "A valid email address is required",
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.email && (
          <span className="text-[1.4rem] text-red-700">
            {errors.email.message}
          </span>
        )}
      </FormRow>
      <FormRow fieldName="phone">
        <input
          type="text"
          id="phone"
          {...register("phone", {
            required: "A valid phone number is required",
          })}
          className="border-grey-300 bg-grey-0 rounded-[5px] border px-[1.2rem] py-[0.8rem] text-[1.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
        {errors.phone && (
          <span className="text-[1.4rem] text-red-700">
            {errors.phone.message}
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
      <FormRow fieldName="supplier-image">
        <input
          id="supplier-image"
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
          {isEditing ? "Update Supplier" : "Create Supplier"}
        </Button>
      </div>
    </Form>
  );
}
