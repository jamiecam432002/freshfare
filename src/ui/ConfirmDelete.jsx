import Button from "./Button";

export default function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <div className="flex w-[40rem] flex-col gap-5 [&_div]:flex [&_div]:justify-end [&_div]:gap-5 [&_p]:mb-5 [&_p]:text-[--color-gray-500]">
      <h3 className="text-[2rem] font-medium leading-[1.4]">
        Delete {resourceName}
      </h3>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}
