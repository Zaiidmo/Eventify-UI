import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "eventify-api-production-f6e1.up.railway.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Axios Error: ", err.response?.data || err.message);
    } else {
      console.error("Unknown Error: ", err);
    }
    throw err;
  }
};
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Axios Error: ", err.response?.data || err.message);
    } else {
      console.error("Unknown Error: ", err);
    }
    throw err;
  }
};
export const getLastEvent = async () => {
  try {
    const response = await apiClient.get("/events/latest");
    return response.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Axios Error: ", err.response?.data || err.message);
    } else {
      console.error("Unknown Error: ", err);
    }
    throw err;
  }
};
export const getFourcomingEvents = async () => {
  try {
    const response = await apiClient.get("/events/upcoming");
    const data = [];
    for (let i = 0; i < 8; i++) {
      if (!response.data.data[i]) {
        break;
      }
      data.push(response.data.data[i]);
    }

    console.log("data: ", data);

    return data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Axios Error: ", err.response?.data || err.message);
    } else {
      console.error("Unknown Error: ", err);
    }
    throw err;
  }
};
export const getPastEvents = async () => {
  try {
    const response = await apiClient.get("events/past-events");
    const pastEvents = [];
    for(let i = 0; i < response.data.data.length; i++) {
      if(!response.data.data[i]){
        break;
      }
      pastEvents.push(response.data.data[i])
    }
    return pastEvents;
  } catch( err) {
    throw new Error;
  }
}
export const getAllUpcomingEvents = async () => {
  try {
    const response = await apiClient.get("events/upcoming");
    return response.data.data;
  } catch( err) {
    throw new Error;
  }
}
export const getOrganizerEvents = async () => {
  try {
    const response = await apiClient.get('/events/my-events');
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch organizer events');
  }
};

export const getParticipatedEvents = async () => {
  try {
    const response = await apiClient.get('/registrations/user');    
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch participated events');
  }
};

export const participate = async (eventId: string) => {
  try {
    const response = await apiClient.post('/registrations', {event: eventId});
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Failed to participate in event');
  }
}

export const fetchParticipants = async (eventId: string) => {
  try {
    const response = await apiClient.get(`/registrations/events/${eventId}`);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch participants');
  }
}

export const createEvent = async (eventData: FormData) => {
  try {
    const response = await apiClient.post("/events/create", eventData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });    return response.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Axios Error: ", err.response?.data || err.message);
    } else {
      console.error("Unknown Error: ", err);
    }
    throw err;
  }
}

export const updateEvent = async (eventId: string, eventData: FormData) => {
  try {
    const response = await apiClient.patch(`/events/update/${eventId}`, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      console.error("Axios Error: ", err.response?.data || err.message);
    } else {
      console.error("Unknown Error: ", err);
    }
    throw err;
  }
}

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await apiClient.delete(`/events/delete/${eventId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete event');
  }
}