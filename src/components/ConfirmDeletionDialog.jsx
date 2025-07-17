"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { useActionState } from "react";

export default function ConfirmDeletionDialog({ open, onClose, onConfirm }) {
  const initialState = { success: false, error: null };

  const [_, triggerDelete, pending] = useActionState(async () => {
    await onConfirm();
    return { success: true, error: null };
  }, initialState);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent className="rounded-xl shadow-2xl border border-gray-100 bg-white">
        <ModalHeader className="px-6 pt-6 pb-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Delete Event</h2>
        </ModalHeader>

        <ModalBody className="px-6 py-4 space-y-5">
          <p className="text-sm text-gray-600">
            This action cannot be undone. Are you sure you want to permanently
            delete this event?
          </p>
          <form action={triggerDelete}>
            <div className="flex justify-end space-x-3 pt-2">
              <Button
                variant="light"
                className="rounded-full px-5"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                className="rounded-full px-5 shadow-sm"
                type="submit"
                isLoading={pending}
              >
                Delete
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
