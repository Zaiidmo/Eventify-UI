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
  const response = await getAllUpcomingEvents();
  return response.data;
});

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchEvents.pending, (state) => {
      state.loading = true;
    });
    builder
    .addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch events";
    });
  },
});

export default eventSlice.reducer;