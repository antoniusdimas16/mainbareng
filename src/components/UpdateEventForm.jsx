"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
  DatePicker,
  TimeInput,
  Button,
} from "@heroui/react";
import { updateEvent } from "@/actions/updateEvent";
import {
  parseAbsoluteToLocal,
  toCalendarDate,
  Time,
} from "@internationalized/date";

export default function UpdateEventForm({ event }) {
  const router = useRouter();
  const initialState = { success: false, error: null };

  async function handleSubmit(_, formData) {
    try {
      await updateEvent(formData);
      router.push(`/event/${event.id}`);
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  const [state, formAction] = useActionState(handleSubmit, initialState);

  const sportType = [
    { key: "Futsal", label: "Futsal" },
    { key: "Basketball", label: "Basketball" },
    { key: "Badminton", label: "Badminton" },
    { key: "Yoga", label: "Yoga" },
    { key: "Tennis", label: "Tennis" },
    { key: "Other", label: "Other" },
  ];

  const utcString = new Date(event.date_time).toISOString();
  const zoned = parseAbsoluteToLocal(utcString);
  const dateValue = toCalendarDate(zoned);
  const timeValue = new Time(zoned.hour, zoned.minute);

  return (
    <form action={formAction} className="space-y-6">
      <Input
        name="title"
        label="Title"
        defaultValue={event.title}
        isRequired
        errorMessage="Title is required"
      />
      <Textarea
        name="description"
        label="Description"
        defaultValue={event.description}
      />
      <Select
        name="sport_type"
        label="Sport Type"
        defaultSelectedKeys={[event.sport_type]}
        isRequired
        errorMessage="Sport type is required"
      >
        {sportType.map((sport) => (
          <SelectItem key={sport.key}>{sport.label}</SelectItem>
        ))}
      </Select>
      <div className="flex space-x-3">
        <DatePicker
          name="date"
          label="Date"
          type="datetime-local"
          defaultValue={dateValue}
          isRequired
          errorMessage="Date is required"
        />
        <TimeInput
          name="time"
          label="Time"
          type="datetime-local"
          defaultValue={timeValue}
          isRequired
          errorMessage="Time is required"
        />
      </div>
      <Input
        name="max_participant"
        label="Max Participants"
        type="number"
        defaultValue={event.max_participant}
      />
      <Input
        name="location_name"
        label="Location Name"
        defaultValue={event.location_name}
      />
      <Input
        name="city"
        label="City"
        defaultValue={event.city}
        isRequired
        errorMessage="City is required"
      />
      <Input
        name="price"
        label="Price"
        type="number"
        defaultValue={event.price}
      />
      <div>
        <Checkbox
          name="is_private"
          value="true"
          defaultSelected={event.is_private}
        >
          Private Event
        </Checkbox>
      </div>

      <input type="hidden" name="eventId" value={event.id} />

      <div className="flex justify-end space-x-3">
        <Link href={`/event/${event.id}`}>
          <Button color="warning" variant="light">
            Cancel
          </Button>
        </Link>
        <Button type="submit" color="primary">
          Save
        </Button>
      </div>

      {state.error && (
        <p className="text-sm text-red-600 text-center">{state.error}</p>
      )}
    </form>
  );
}
