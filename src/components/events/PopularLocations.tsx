import { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import { getUpcomingEvents } from "@/services/apiClient";
import { GridLoader } from "react-spinners";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  banner: string;
  capacity: number;
}


  
  export default function PopulareLocations() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchPopularLocations = async () => {
        try {
          const response = await getUpcomingEvents();
          setEvents(response);
          console.log("response: ", response);
          setLoading(false);
        } catch (err) {
          setError("Failed to load popular locations. Please try again.");
          setLoading(false);
        }
      };

      fetchPopularLocations();
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
  
    if (!events) {
      return (
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-gray-500">No event available.</p>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col p-8 gap-4 md:gap-8">
        <h2 className="text-3xl font-semibold font-titles text-gray-800 dark:text-white mb-4">
          Popular Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {events.map((event) => (
            <EventCard key={event._id} {...event} />
          ))}
        </div>
      </div>
    );
  }
  