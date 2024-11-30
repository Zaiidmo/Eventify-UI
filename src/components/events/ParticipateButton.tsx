import { participate } from "@/services/apiClient";
import { Play } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

// Define the prop type
interface ParticipateButtonProps {
  eventId: string;
}

const ParticipateButton: React.FC<ParticipateButtonProps> = ({ eventId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const authenticated = useSelector((state: any) => state.auth.isAuthenticated);
  
  
  const participateInEvent = async () => {
    if (!authenticated) {
      setError("Please login to participate in the event");
      return;
    }
    console.log("Participating in event:", eventId);
    
    setLoading(true);
    setError(null);
    try {
      const result = await participate(eventId);
      if(result.error) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      // console.log("Participation result:", result);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to participate in event";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
}

export default ParticipateButton;
