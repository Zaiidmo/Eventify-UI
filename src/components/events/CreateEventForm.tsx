import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { createEvent } from "@/services/apiClient";
import { useNavigate } from "react-router-dom";

interface EventFormData {
  title: string;
  description: string;
  capacity: number;
  location: string;
  date: string;
  banner: FileList;
}

const notify = ({
  message = "",
  type = "default",
  duration = 6000,
}: {
  message: string;
  type: "success" | "error" | "loading" | "default";
  duration?: number;
}) => {
  if (type in toast) {
    (toast[type as keyof typeof toast] as Function)(message, {
      duration,
      position: "bottom-right",
    });
  } else {
    toast(message, {
      duration,
      position: "bottom-right",
    });
  }
};

export function CreateEventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("capacity", data.capacity.toString());
    formData.append("location", data.location);
    formData.append("date", data.date);
    if (data.banner[0]) {
      formData.append("banner", data.banner[0]);
    }

    try {
      await createEvent(formData);
      notify({
        message: "Event created successfully",
        type: "success",
      });
      navigate("/dashboard");
    } catch (error: any) {
      notify({
        message: error.message || "Failed to create event. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Event Title"
          {...register("title", { required: "Title is required" })}
          className="w-full px-3 py-2 text-white bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
        placeholder="Event Description"
          id="description"
          {...register("description", { required: "Description is required" })}
          className="w-full px-3 py-2 text-white bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          placeholder="Event Capacity"
          className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
          id="capacity"
          type="number"
          {...register("capacity", {
            required: "Capacity is required",
            min: 1,
          })}
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm">{errors.capacity.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          placeholder="Event Location"
          className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
          id="location"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
          id="date"
          type="date"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="banner">Banner Image</Label>
        <Input
          className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
          id="banner"
          type="file"
          accept="image/*"
          {...register("banner")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Event"}
      </Button>
    </form>
  );
}