"use client";

import { useActionState } from "react";
import { createEvent } from "@/actions/createEvent";
import {
  Input,
  Textarea,
  Checkbox,
  DatePicker,
  TimeInput,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect } from "react";
import { sportTypeOptions } from "@/constants/sportTypeOptions";
import { showSuccessToast, showErrorToast } from "@/utils/showToast";

export default function CreateEventForm({ onSuccess, onPending }) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const initialState = { success: false, error: null };

  async function handleSubmit(_, formData) {
    const result = await createEvent(formData);

    if (!result.success) {
      showErrorToast(
        result.error || "Failed to create event. Please Try Again."
      );
      return { success: false, error: result.error };
    }

    showSuccessToast("Event created!");
    if (onSuccess) onSuccess();
    return { success: true, error: null };
  }

  const [state, formAction, pending] = useActionState(
    handleSubmit,
    initialState
  );

  useEffect(() => {
    if (onPending) onPending(pending);
  }, [pending, onPending]);

  return (
    <form action={formAction} id="event-form" className="space-y-6">
      <fieldset disabled={pending} className="space-y-6">
        <Input
          name="title"
          label="Title"
          placeholder="Event name"
          isRequired
          errorMessage="Title is required"
        />
        <Textarea
          name="description"
          label="Description"
          placeholder="Event description (optional)"
        />
        <Select
          name="sport_type"
          label="Sport Type"
          placeholder="Example: Futsal, Badminton"
          isRequired
          errorMessage="Sport type is required"
        >
          {sportTypeOptions.map((sport) => (
            <SelectItem key={sport.key}>{sport.label}</SelectItem>
          ))}
        </Select>
        <div className="flex space-x-3">
          <DatePicker
            name="date"
            label="Date"
            type="datetime-local"
            isRequired
            errorMessage="Date is required"
          />
          <TimeInput
            name="time"
            label="Time"
            type="datetime-local"
            isRequired
            errorMessage="Time is required"
          />
        </div>
        <Input
          name="max_participant"
          label="Max Participants"
          type="number"
          placeholder="Number of max participants"
        />
        <Input
          name="location_name"
          label="Location Name"
          placeholder="Location (Field or pool name)"
        />
        <Input
          name="city"
          label="City"
          placeholder="City name"
          isRequired
          errorMessage="City is required"
        />
        <Input
          name="price"
          label="Price"
          type="number"
          placeholder="Total cost (optional)"
        />
        <Input
          name="image"
          label="Image"
          type="file"
          accept=".png, .jpg, .jpeg"
          placeholder="Banner image"
        />
        <Checkbox name="is_private" value="true">
          Private Event
        </Checkbox>
        <input type="hidden" name="timezone" value={timeZone} />

        {state.error && (
          <p className="text-sm text-red-600 text-center">{state.error}</p>
        )}
      </fieldset>
    </form>
  );
}
