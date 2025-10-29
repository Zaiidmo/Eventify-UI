import {CreateEventForm} from "@/components/events/CreateEventForm";
import { Table } from "@/components/events/Table";
import { GlassModal } from "@/components/modals/GlassModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import Seo from "@/components/Seo";

const Dashboard = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const AuthenticatedUser = useSelector((state: any) => state.auth.user);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-gray-600 dark:text-gray-300">
          You are not authenticated. Please log in.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-screen ">
      <Seo title="Dashboard — Eventify" description="Organizer dashboard on Eventify." canonicalPath="/dashboard" noindex />
      <div className="w-full my-8 justify-center items-center flex flex-col md:p-8 gap-4 md:gap-8 ">
        <h1 className="text-sm md:text-xl text-center w-full font-headers text-gray-800 dark:text-white mb-4">
          <>
            <div>
              <h1>{AuthenticatedUser.username}'s Events</h1>
            </div>
            {/* Events Table */}
            <section className="relative">
              <Table />

              {/* Create Event Button and Modal */}
              <GlassModal
                trigger={
                  <Button className="fixed top-20 right-10 bg-primary text-white hover:bg-black">
                    <Plus size={24} className="mr-2" />
                    Create Event
                  </Button>
                }
              >
                {/* Only one child element passed to GlassModal */}
                <div>
                  <CreateEventForm />
                </div>
              </GlassModal>
            </section>
          </>
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;