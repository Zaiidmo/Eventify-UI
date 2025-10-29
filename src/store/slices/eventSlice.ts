import { getAllUpcomingEvents } from "@/services/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  banner: string;
  organizer: string;
}

export const fetchEvents = createAsyncThunk("events/upcoming", async () => {
  try {
    const response = await getAllUpcomingEvents();
    return response;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
});

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};


const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      });
  },
});

export default eventSlice.reducer;
