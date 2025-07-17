"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import CreateEventForm from "@/components/CreateEventForm";

export default function CreateEventButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <Button
        onPress={onOpen}
        type="button"
        size="sm"
        className="fixed bottom-10 right-10 z-50 group flex items-center justify-center w-14 hover:w-52 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 overflow-hidden px-4"
      >
        <span className="text-lg align-middle font-bold transform transition-transform duration-300 group-hover:rotate-90">
          +
        </span>
        <span className="hidden text-base font-medium ml-2 max-w-0 overflow-hidden opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:block transition-all duration-300 whitespace-nowrap">
          Create New Event
        </span>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
        <ModalContent className="h-[80vh] overflow-y-auto">
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                Create New Event
              </ModalHeader>
              <ModalBody className="px-6 py-4">
                <CreateEventForm onSuccess={onClose} onPending={setIsPending} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  form="event-form"
                  isLoading={isPending}
                >
                  Create Event
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
