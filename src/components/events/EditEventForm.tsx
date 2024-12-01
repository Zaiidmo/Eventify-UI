import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { updateEvent } from "@/services/apiClient";

interface EventFormData {
  title: string;
  description: string;
  capacity: number;
  location: string;
  date: string;
  banner: FileList;
}

interface EditEventFormProps {
  event: any; 
  onSuccess: (updatedEvent: any) => void; 
}

export function EditEventForm({ event, onSuccess }: EditEventFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>({
    defaultValues: {
      title: event.title,
      description: event.description,
      capacity: event.capacity,
      location: event.location,
      date: event.date,
    },
  });
  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("capacity", data.capacity.toString());
    formData.append("location", data.location);
    formData.append("date", data.date);

    if (data.banner?.[0]) {
      formData.append("banner", data.banner[0]);
    }

    try {
      const response = await updateEvent(event._id, formData); // API call to PATCH endpoint
      toast.success("Event updated successfully!");
      onSuccess(response.data); // Update the table with the updated event
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update event.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: "Title is required" })} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="w-full border border-gray-400 rounded-md"
          rows={4}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          type="number"
          {...register("capacity", { required: "Capacity is required", min: 1 })}
        />
        {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register("location", { required: "Location is required" })} />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register("date", { required: "Date is required" })} />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>
      <div>
        <Label htmlFor="banner">Banner</Label>
        <Input id="banner" type="file" accept="image/*" {...register("banner")} />
      </div>
      <Button type="submit">Update Event</Button>
    </form>
  );
}
