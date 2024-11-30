import HeroSection from "@/components/home/HeroSection";
import "../App.css";
import LastPostedEvents from "@/components/home/LastPostedEventsSection";
import MissedEvents from "@/components/home/MissedEventsSection";
function Home() {
  return (
    <>
      <div className="w-screen ">
        <HeroSection />
        <LastPostedEvents />
        <MissedEvents />
      </div>
    </>
  );
}
export default Home;
