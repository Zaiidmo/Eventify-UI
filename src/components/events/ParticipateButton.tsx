import { Play } from "lucide-react";

// const participate = () => {
    
// }
export default function ParticipateButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-3 bg-white text-black rounded hover:bg-white/90 transition tracking-widest">
      <Play className="w-5 h-5" />
      Participate
    </button>
  );
}
