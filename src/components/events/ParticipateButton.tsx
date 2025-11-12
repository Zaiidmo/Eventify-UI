import { getParticipatedEvents } from "@/services/apiClient";
import { Play, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";

interface ParticipateButtonProps {
  eventId: string;
}

const notify = ({
  message = "",
  type = "default",
  icon = null,
  duration = 6000,
}: {
  message: string;
  type: "success" | "error" | "loading" | "default" | "info" ;
  icon?: null | string;
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
      icon: icon || null,
      position: "bottom-right",
    });
  }
};


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
        if (result.error) {
          setError(result.error);
          notify({ message: result.error, type: "error" });
          return;
        }
  
        const events = result.data; 
        if (events.some((event: any) => event._id === eventId)) {
          notify({ message: "You have already registered for this event", type: "info" });
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

  /*
    * To enable participation, uncomment the function below and replace the onClick handler in the button
    * Also add an import for participate from the apiClient at the top (Alongside with getParticipatedEvents)
  */

  // const participateInEvent = async () => {
  //   if (!authenticated) {
  //     setError("Please login to participate in the event");
  //     notify({ message: "Please login to participate in the event", type: "error" });
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const result = await participate(eventId);
  //     if (result.error) {
  //       setError(result.error);
  //       notify({ message: result.error, type: "error" });
  //       return;
  //     }
  //     setSuccess(true);
      
  //     notify({ message: `You successfully registered your participation for this event`, type: "success" });
  //     setIsAlreadyRegistered(true); // Update immediately
  //   } catch (error: any) {
  //     const message =
  //       error.response?.data?.message ||
  //       error.message ||
  //       "Failed to participate in event";
  //     setError(message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const disabledParticipationAction = async() => {
    setLoading(true);
    notify({ message: "All services are currently disabled", type: "error" });
    notify({ message: `This UI shows preview data only (read-only). For full access, contact the owner.`, type: "info", icon: "⚠️" });
    setLoading(false);
  }

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
        onClick={disabledParticipationAction} // In order to enable participation, replace with participateInEvent
        disabled={false}
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
