"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
} from "@heroui/react";
import { useState } from "react";

export default function ParticipantListModal({ participants }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tooltip content="View Participants">
        <Button
          size="sm"
          isIconOnly
          variant="light"
          color="primary"
          onPress={() => setOpen(true)}
          className="p-1 pb-2 h-7 w-7 min-w-7 text-sm"
        >
          👥
        </Button>
      </Tooltip>

      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent className="rounded-xl shadow-2xl border border-gray-100 bg-white">
          <ModalHeader className="px-6 pt-6 pb-2 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Event's Participants
            </h2>
          </ModalHeader>

          <ModalBody className="px-6 py-4 space-y-5">
            {participants.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                Belum ada peserta yang bergabung. Yuk join!
              </p>
            ) : (
              <ul className="space-y-2 text-sm text-gray-700">
                {participants.map((p, i) => (
                  <li key={p.email} className="flex items-center gap-2">
                    <span className="text-gray-600">{i + 1}.</span>
                    <div className="flex flex-row items-center gap-2">
                      <span className="font-medium">
                        {p.first_name} {p.last_name}
                      </span>
                      <span className="text-gray-500 text-xs">{p.email}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ModalBody>

          <ModalFooter className="px-6 pb-4">
            <Button
              variant="light"
              color="primary"
              className="rounded-full px-5"
              onPress={() => setOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
