import React, { useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { GlassModal } from "../modals/GlassModal";
import { Button } from "../ui/button";
import { getOrganizerEvents, fetchParticipants } from "@/services/apiClient";
import jsPDF from "jspdf";
import { GridLoader } from "react-spinners";
import { ParticipantsTable } from "./ParticipantsTable";

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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getOrganizerEvents();
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].date = new Date(data.data[i].date).toLocaleDateString();      }
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
      setParticipants(data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch participants");
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
    doc.text(`Event: ${eventTitle}`, pageWidth / 2, margin + 10, { align: "center" });
  
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
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, footerY);
    // Save File
    const sanitizedTitle = eventTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    doc.save(`${sanitizedTitle}_participants.pdf`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const columns: Column<any>[] = [
    { key: "title", label: "Event Title" },
    { key: "date", label: "Date" },
    { key: "capacity", label: "Capacity Left" },
  ];

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
            onSort={() => {}}
          />
          <tbody className="divide-y divide-gray-200  bg-gray-100/60 dark:bg-gray-600/60">
            {events.map((event) => (
              <GlassModal
                key={event._id}
                trigger={
                  <tr
                    className="cursor-pointer text-gray-600 text-left dark:text-gray-400 hover:text-black dark:hover:text-black hover:bg-gray-100"
                    onClick={() => fetchEventParticipants(event._id)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="whitespace-nowrap  px-6 py-4 text-sm"
                      >
                        {event[column.key]}
                      </td>
                    ))}
                  </tr>
                }
              >
                <div className="p-6">
                  <h2 className="text-lg font-medium mb-4">
                    Event Participants
                  </h2>
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
