"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { deleteEvent } from "@/actions/deleteEvent";
import { showSuccessToast, showErrorToast } from "@/utils/showToast";
import ConfirmDeletionDialog from "@/components/ConfirmDeletionDialog";

export default function DeleteEventButton({ eventId }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const initialState = { success: false, error: null };

  async function handleDelete(_, formData) {
    const result = await deleteEvent(formData);

    if (!result.success) {
      const error = result.error || "Failed to delete event.";
      showErrorToast(error);
      return { success: false, error };
    }

    showSuccessToast("Event deleted successfully");
    router.push("/event");
    return { success: true, error: null };
  }

  const [_, formAction] = useActionState(handleDelete, initialState);

  return (
    <>
      <form id={`delete-event-form-${eventId}`} action={formAction}>
        <input type="hidden" name="eventId" value={eventId} />
        <Button
          size="sm"
          variant="light"
          color="danger"
          type="button"
          onPress={() => setShowConfirm(true)}
        >
          Delete
        </Button>
      </form>

      <ConfirmDeletionDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          const form = document.getElementById(`delete-event-form-${eventId}`);
          if (form) form.requestSubmit();
        }}
      />
    </>
  );
}
