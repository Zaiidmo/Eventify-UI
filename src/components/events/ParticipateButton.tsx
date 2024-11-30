import { getParticipatedEvents, participate } from "@/services/apiClient";
import { Play, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ParticipateButtonProps {
  eventId: string;
}

const ParticipateButton: React.FC<ParticipateButtonProps> = ({ eventId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const participatedEvents = async () => {
      try {
        const result = await getParticipatedEvents();
        console.log("API response:", result.data);
        if (result.error) {
          setError(result.error);
          return;
        }
  
        const events = result.data; 
        if (events.some((event: any) => event.event._id === eventId)) {
          console.log("Already registered");
          
          setIsAlreadyRegistered(true);
        }
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch participated events";
        setError(message);
      }
    };
  
    if (authenticated) {
      participatedEvents();
    }
  }, [eventId, authenticated]);
  

  useEffect(() => {
    if (!authenticated) {
      setSuccess(false);
      setError(null);
      setIsAlreadyRegistered(false);
    }
  }, [authenticated]);

  const participateInEvent = async () => {
    if (!authenticated) {
      setError("Please login to participate in the event");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await participate(eventId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      setIsAlreadyRegistered(true); // Update immediately
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to participate in event";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return isAlreadyRegistered ? (
    <button
      disabled
      className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-500 cursor-not-allowed rounded tracking-widest"
    >
      <StopCircle className="w-5 h-5" />
      Already registered
    </button>
  ) : (
    <>
      <button
        onClick={participateInEvent}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-3 bg-white text-black rounded hover:bg-white/90 transition tracking-widest"
      >
        <Play className="w-5 h-5" />
        {loading ? "Loading..." : "Participate"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Registration successful!</p>
      )}
    </>
  );
};

export default ParticipateButton;
