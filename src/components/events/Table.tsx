import React, { useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { GlassModal } from "../modals/GlassModal";
import { Button } from "../ui/button";
import { getOrganizerEvents, fetchParticipants } from "@/services/apiClient";
import jsPDF from "jspdf";
import { GridLoader } from "react-spinners";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export function Table() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(
    null
  );
  
  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };
  
  // const sortedData = useMemo(() => {
  //   if (!sortConfig) return events;
  
  //   return [...events].sort((a, b) => {
  //     const aValue = a[sortConfig.key ];
  //     const bValue = b[sortConfig.key ];
  
  //     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
  //     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
  //     return 0;
  //   });
  // }, [events, sortConfig]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getOrganizerEvents();
      console.log('data', data.data);
      
      setEvents(data.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventParticipants = async (eventId: string) => {
    try {
      const data = await fetchParticipants(eventId);
      console.log('dataOPar', data.data);
      setParticipants(data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch participants");
    }
  };

  const downloadParticipants = () => {
    const doc = new jsPDF();
    doc.text("Participants List", 10, 10);
    participants.forEach((participant, index) => {
      doc.text(`${index + 1}. ${participant.name} - ${participant.email}`, 10, 20 + index * 10);
    });
    doc.save("participants.pdf");
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const columns: Column<any>[] = [
    { key: "title", label: "Event Title" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <GridLoader color="#d64218" size={10} />
      </div>
    );
  }  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="shadow w-full mb-16">
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full rounded-xl divide-y divide-gray-300">
          <TableHeader columns={columns} sortConfig={sortConfig} onSort={handleSort} />
          <tbody className="divide-y divide-gray-200 bg-white">
            {events.map((event) => (
              <GlassModal
                key={event._id}
                trigger={
                  <tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => fetchEventParticipants(event._id)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        {event[column.key]}
                      </td>
                    ))}
                  </tr>
                }
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Participants for {event.name}
                  </h2>
                  {participants.length ? (
                    <div>
                      <table className="min-w-full divide-y divide-gray-200 mb-4">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {participants.map((participant) => (
                            <tr key={participant.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {participant.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {participant.email}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Button
                        onClick={downloadParticipants}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Download Participants
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No participants available.</p>
                  )}
                </div>
              </GlassModal>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}