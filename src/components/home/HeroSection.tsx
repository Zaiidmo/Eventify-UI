import React, { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";
import { GridLoader } from "react-spinners";
import { getLastEvent } from "@/services/apiClient";
import BannerImage from "./BannerImage";

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
        // console.log("response: ", response);
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
          <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded hover:bg-white/90 transition">
            <Play className="w-5 h-5" />
            Join Event
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-gray-500/50 text-white rounded hover:bg-gray-500/70 transition backdrop-blur-sm">
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
