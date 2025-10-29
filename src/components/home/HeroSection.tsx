import React, { useEffect, useState } from "react";
import { CalendarDays, Info, MapPin, Users } from "lucide-react";
import { GridLoader } from "react-spinners";
import { getLastEvent } from "@/services/apiClient";
import BannerImage from "./BannerImage";
import ParticipateButton from "../events/ParticipateButton";
import { GlassModal } from "../modals/GlassModal";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  banner: string;
  capacity: number;
}

const HeroSection: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const response = await getLastEvent();
        setEvent(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to load the latest event. Please try again.");
        setLoading(false);
      }
    };

    fetchLatestEvent();
  }, []);

  

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <GridLoader color="#d64218" size={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500">No event available.</p>
      </div>
    );
  }
  return (
    <div className="relative h-[80vh] w-full">
      <BannerImage path = {event.banner} alternative= {event.title}/>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {event.title}
        </h1>

        <div className="flex items-center gap-4 text-white mb-4">
          <span>{new Date(event.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{event.location}</span>
          <span>•</span>
          <span>{event.capacity} attendees</span>
        </div>

        <p className="text-gray-200 text-ellipsis overflow-hidden whitespace-nowrap max-w-4xl mb-8">{event.description}</p>

        <div className="flex gap-4">
          <ParticipateButton eventId={event._id}/>
          <GlassModal trigger={
          <button className="flex items-center gap-2 px-8 py-3 bg-gray-500/50 text-white rounded hover:bg-gray-500/70 transition backdrop-blur-sm">
            <Info className="w-5 h-5" />
            More Info
          </button>
          }>
            <div className="p-2">
        <div className="space-y-6 ">
          <div className="relative w-full ">
            <img src={event.banner} alt={event.title} className="object-cover rounded-xl w-full " />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{event.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{event.capacity} attendees</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">About this event</h3>
            <p className="text-muted-foreground">{event.description}</p>
          </div>
          <ParticipateButton eventId={event._id}/>
        </div>
      </div>
      </GlassModal>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
