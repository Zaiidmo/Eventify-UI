import { CalendarDays, MapPin, Users } from "lucide-react";
import { GlassModal } from "../modals/GlassModal";
import ParticipateButton from "./ParticipateButton";

interface EventCardProps {
  _id: string;
  title: string;
  date: string;
  location: string;
  capacity: number;
  banner: string;
  description: string;
}

const DateDisplay: React.FC<{ dateString: string }> = ({ dateString }) => {
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(date)
      .replace(/\//g, "-"); // Convert from dd/mm/yyyy to dd-mm-yyyy
  };

  return <p className="text-sm">{formatDate(dateString)}</p>;
};

export function EventCard({
  _id,
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
          className="w-full max-w-sm  group cursor-pointer rounded-xl"
          aria-label={`Event: ${title}`}
        >
          <div className="relative aspect-video rounded-xl">
            <img
              src={banner}
              alt={`Image for ${title}`}
              className="w-full h-full object-cover rounded-xl shadow-xl "
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl " />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-semibold truncate">{title}</h3>
              <DateDisplay dateString={date} />
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
      <div className="p-2">
        <div className="space-y-6 ">
          <div className="relative w-full ">
            <img
              src={banner}
              alt={title}
              className="object-cover rounded-xl w-full "
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{capacity} attendees</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About this event</h3>
            <p className="text-gray-700 dark:text-gray-400">{description}</p>
          </div>
          <ParticipateButton
            key={_id} 
            eventId={_id}
          />{" "}
        </div>
      </div>
    </GlassModal>
  );
}
