import { Table } from "@/components/events/Table";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const AuthenticatedUser = useSelector((state: any) => state.auth.user);
  return (
    <div className="w-screen ">
      <div className="w-full my-8 justify-center items-center flex flex-col md:p-8 gap-4 md:gap-8 ">
        <h1 className="text-4xl md:text-4xl text-center w-full font-headers text-gray-800 dark:text-white mb-4">
          {isAuthenticated ? (
            <div>
              <h1>{AuthenticatedUser.username}'s Dashboard</h1>
            </div>
          ) : (
            <h1>Not authenticated</h1>
          )}
        </h1>
        <Table/>{" "}
      </div>
    </div>
  );
};

export default Dashboard;
