import { CalendarDays, MapPin, Users } from "lucide-react";
import { GlassModal } from "../modals/GlassModal";

interface EventCardProps {
  _id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  banner: string;
  description: string;
}

export function EventCard({
  title,
  date,
  location,
  capacity,
  banner,
  description,
}: EventCardProps) {
  return (
    <GlassModal
      trigger={
        <div
          className="w-full max-w-sm  group cursor-pointer"
          aria-label={`Event: ${title}`}
        >
          <div className="relative aspect-video">
            <img
              src={banner}
              alt={`Image for ${title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-semibold truncate">{title}</h3>
              <p className="text-sm">{date}</p>
            </div>
            {/* {category && (
              <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                {category}
              </span>
            )} */}
          </div>
        </div>
      }
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            <span>{capacity} attendees</span>
          </div>
        </div>
        <p className="mt-4 line-clamp-3">{description}</p>
      </div>
    </GlassModal>
  );
}
