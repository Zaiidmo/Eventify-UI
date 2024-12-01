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
      <table className="min-w-full divide-y divide-gray-300 rounded-lg w-full max-w-md space-y-8 p-8 shadow-lg sm:max-w-[425px] md:max-w-screen-md md:mx-auto backdrop-filter backdrop-blur-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
              Registration Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {participants.map((participant) => (
            <tr key={participant._id}>
              <td className="px-6 py-4 text-sm font-bold text-gray-900">
                {participant.user?.username || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {participant.user?.email || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(participant.registrationDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
