import HeroSection from "@/components/home/HeroSection";
import "../App.css";
import LastPostedEvents from "@/components/home/LastPostedEventsSection";
import MissedEvents from "@/components/home/MissedEventsSection";
import { Toaster } from "react-hot-toast";
function Home() {
  return (
    <>
      <div className="w-screen ">
        <Toaster position="bottom-right" />

        <HeroSection />
        <LastPostedEvents />
        <MissedEvents />
      </div>
    </>
  );
}
export default Home;
