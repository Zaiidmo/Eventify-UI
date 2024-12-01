import React, { useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { GlassModal } from "../modals/GlassModal";
import { Button } from "../ui/button";
import {
  getOrganizerEvents,
  fetchParticipants,
  deleteEvent,
} from "@/services/apiClient";
import jsPDF from "jspdf";
import { GridLoader } from "react-spinners";
import { ParticipantsTable } from "./ParticipantsTable";
import { EditEventForm } from "./EditEventForm";
import { Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

const notify = ({
  message = "",
  type = "default",
  duration = 6000,
}: {
  message: string;
  type: "success" | "error" | "loading" | "default";
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
      position: "bottom-right",
    });
  }
};


export function Table() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      notify({ message: "Event deleted successfully!", type: "success" });
    } catch (error: any) {
      console.error("Failed to delete event:", error);
      notify({ message: error?.response?.data?.message || "Failed to delete event.", type: "error" });
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getOrganizerEvents();
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].date = new Date(data.data[i].date).toLocaleDateString();
      }
      setEvents(data.data);
      notify({ message: "Events fetched successfully!", type: "success" });
    } catch (err: any) {
      setError(err.message || "Failed to fetch events");
      notify({ message: err?.response?.data?.message || "Failed to fetch events.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchEventParticipants = async (eventId: string) => {
    try {
      const data = await fetchParticipants(eventId);
      setParticipants(data.data);
      notify({ message: "Participants fetched successfully!", type: "success" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch participants");
      notify({ message: err?.response?.data?.message || "Failed to fetch participants.", type: "error" });
    }
  };

  const downloadParticipants = (eventTitle: string) => {
    if (participants.length === 0) {
      alert("No participants available to download.");
      return;
    }

    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`Participants List`, pageWidth / 2, margin, { align: "center" });

    doc.setFontSize(16);
    doc.text(`Event: ${eventTitle}`, pageWidth / 2, margin + 10, {
      align: "center",
    });

    // Decorative line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, margin + 15, pageWidth - margin, margin + 15);

    // Table Headers
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const headerY = margin + 25;
    const rowHeight = 8;

    doc.setFillColor(230, 230, 230);
    doc.rect(margin, headerY - 5, pageWidth - margin * 2, rowHeight, "F");

    doc.text("No.", margin + 5, headerY);
    doc.text("Username", margin + 20, headerY);
    doc.text("Email", margin + 90, headerY);

    // Table Rows
    doc.setFont("helvetica", "normal");
    let currentY = headerY + rowHeight;

    participants.forEach((participant, index) => {
      if (currentY > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        currentY = margin;
        // Redraw headers on a new page
        doc.setFillColor(230, 230, 230);
        doc.rect(margin, currentY - 5, pageWidth - margin * 2, rowHeight, "F");

        doc.text("No.", margin + 5, currentY);
        doc.text("Username", margin + 20, currentY);
        doc.text("Email", margin + 90, currentY);

        currentY += rowHeight;
      }

      doc.text(`${index + 1}`, margin + 5, currentY);
      doc.text(participant.user?.username || "N/A", margin + 20, currentY);
      doc.text(participant.user?.email || "N/A", margin + 90, currentY);

      currentY += rowHeight;
    });

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - margin;
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      margin,
      footerY
    );
    // Save File
    const sanitizedTitle = eventTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    doc.save(`${sanitizedTitle}_participants.pdf`);
    notify({ message: "Participants document downloaded successfully!", type: "success" });
  };

  // Sorting function
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...events].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setEvents(sortedData);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const columns: Column<any>[] = [
    { key: "title", label: "Event Title", sortable: true },
    { key: "date", label: "Date", sortable: false },
    { key: "capacity", label: "Capacity Left", sortable: true },  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <GridLoader color="#d64218" size={10} />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="shadow w-full mb-16 font-poppins my-4">
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full rounded-xl divide-y text-black divide-gray-300">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort} // Pass the handleSort function to TableHeader
          />
          <tbody className="divide-y divide-gray-200  bg-gray-100/60 dark:bg-gray-600/60">
            {events.map((event) => (
              <GlassModal
                key={event._id}
                trigger={
                  <tr
                    className="cursor-pointer text-gray-600 text-left dark:text-gray-400 hover:text-black dark:hover:text-black hover:bg-gray-400"
                    onClick={() => fetchEventParticipants(event._id)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="whitespace-nowrap  px-6 py-4 text-sm"
                      >
                        {column.render
                          ? column.render(event)
                          : event[column.key]}{" "}
                      </td>
                    ))}
                  </tr>
                }
              >
                <div className="p-6">
                  <h2 className="text-lg font-medium mb-4">
                    Event Participants
                  </h2>
                  <div className="mb-2 flex flex-col md:flex-row gap-2">
                    <GlassModal 
                      trigger={
                        <Button className="bg-primary text-white hover:bg-red-700">
                          <Edit size={24} className="mr-2" />
                          Edit Event
                        </Button>
                      }
                    >
                      <EditEventForm event={event} onSuccess={fetchEvents} />
                    </GlassModal>
                    <Button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-700 text-white hover:bg-red-800"
                    >
                      <Trash size={24} className="mr-2" />
                      Delete Event
                    </Button>
                  </div>
                  {participants.length > 0 ? (
                    <>
                      <ParticipantsTable participants={participants} />
                      <Button
                        onClick={() => downloadParticipants(event.title)}
                        className="mt-4 bg-primary text-white hover:bg-black"
                      >
                        Download Participants Document
                      </Button>
                    </>
                  ) : (
                    <p className="text-gray-500">No participants found.</p>
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
