import HeroSection from "@/components/home/HeroSection";
import "../App.css";
import LastPostedEvents from "@/components/home/LastPostedEventsSection";
import MissedEvents from "@/components/home/MissedEventsSection";
import { Toaster } from "react-hot-toast";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
function Home() {
  return (
    <>
      <Seo
        title="Eventify — Home"
        description="Eventify by Zaiid Moumni (TheVlpha): find, create, and manage events with an elegant experience."
        canonicalPath="/"
        imagePath="/hero.webp"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Eventify",
          url: "https://zaiid.moumni.uk",
          logo: "/logo.png",
          founder: {
            "@type": "Person",
            name: "Zaiid Moumni",
            alternateName: "TheVlpha",
            url: "https://zaiid.moumni.uk",
          },
        }}
      />
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
