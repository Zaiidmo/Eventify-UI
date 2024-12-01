interface Participant {
  _id: string;
  event: string;
  registrationDate: string;
  user: {
    username: string;
    email: string;
  };
}

interface ParticipantsTableProps {
  participants: Participant[];
}

export function ParticipantsTable({ participants }: ParticipantsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full rounded-lg w-full max-w-md space-y-8 p-8 shadow-lg sm:max-w-[425px] md:max-w-screen-md md:mx-auto backdrop-filter backdrop-blur-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-900/80">
          <tr className="divide-x  dark:divide-gray-700">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-500 uppercase">
              Registration Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-700/80 dark:divide-gray-500">
          {participants.map((participant) => (
            <tr key={participant._id} className="divide-x divide-gray-200 dark:divide-gray-500">
              <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                {participant.user?.username || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                {participant.user?.email || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                {new Date(participant.registrationDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
