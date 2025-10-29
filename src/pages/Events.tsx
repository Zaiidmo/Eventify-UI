import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchEvents } from "@/store/slices/eventSlice";
import { GridLoader } from "react-spinners";
import { EventCard } from "@/components/events/EventCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Seo from "@/components/Seo";

const EventsPage = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useSelector((state: any) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <GridLoader color="#d64218" size={10} />
      </div>
    );
  }

  if (error) {
    return <p>Error loading events: {error}</p>;
  }

  if (!events) {
    return <p>No events available.</p>;
  }

  return (
    <div className="w-screen ">
        <Seo
          title="Upcoming events — Eventify"
          description="Browse upcoming events on Eventify by Zaiid Moumni (TheVlpha)."
          canonicalPath="/events"
        />
        <div className="w-full my-8 justify-center items-center flex flex-col md:p-8 gap-4 md:gap-8 ">
          <h2 className="text-4xl md:text-6xl text-center w-full font-headers text-gray-800 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mx-4 h-full">
            {events.map((event: any) => (
              <EventCard key={event._id} {...event} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default EventsPage;
