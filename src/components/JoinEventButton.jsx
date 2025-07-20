"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { joinEvent } from "@/actions/joinEvent";
import { cancelJoinEvent } from "@/actions/cancelJoinEvent";
import { showSuccessToast, showErrorToast } from "@/utils/showToast";

export default function JoinEventButton({
  eventId,
  userId,
  hasJoined,
  isFull,
}) {
  const router = useRouter();
  const initialState = { success: false, error: null };

  async function handleJoin(_, formData) {
    if (isFull) {
      const error = "Event is already full.";
      showErrorToast(error);
      return { success: false, error };
    }

    const result = await joinEvent(formData);

    if (!result.success) {
      const error = result.error || "Event is full or something went wrong.";
      showErrorToast(error);
      return { success: false, error };
    }

    showSuccessToast("See you in the event!");
    router.refresh();
    return { success: true, error: null };
  }

  async function handleCancel(_, formData) {
    const result = await cancelJoinEvent(formData);

    if (!result.success) {
      const error = result.error || "Error while canceling. Please try again.";
      showErrorToast(error);
      return { success: false, error };
    }

    router.refresh();
    return { success: true, error: null };
  }

  const [state, joinAction, joinPending] = useActionState(
    handleJoin,
    initialState
  );
  const [_, cancelAction, cancelPending] = useActionState(
    handleCancel,
    initialState
  );

  return (
    <div className="flex justify-end space-x-1.5">
      {hasJoined ? (
        <div className="flex space-x-1.5">
          <form action={cancelAction}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="eventId" value={eventId} />
            <Button
              color="warning"
              variant="light"
              type="submit"
              isLoading={cancelPending}
            >
              Cancel
            </Button>
          </form>

          <Button color="success" variant="flat" isDisabled>
            Already Joined
          </Button>
        </div>
      ) : (
        <form action={joinAction}>
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="eventId" value={eventId} />
          <Button
            color={isFull ? "danger" : "primary"}
            type="submit"
            isLoading={joinPending}
            isDisabled={isFull}
          >
            {isFull ? "Full" : "Join"}
          </Button>
          {state.error && (
            <p className="text-xs text-red-600 text-center mt-1">
              {joinState.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
