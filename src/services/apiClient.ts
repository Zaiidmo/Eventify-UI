import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
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
