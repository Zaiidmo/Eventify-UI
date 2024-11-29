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
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return Promise.reject({
        message: err.response?.data?.message || "API error occurred",
        status: err.response?.status || 500,
      });
    }
    return Promise.reject({ message: "An unexpected error occurred", status: 500 });
  }
// };
// export const loginUser = async (credentials: {
//   identifier: string;
//   password: string;
//   rememberMe: boolean;
// }) => {
//   try {
//     const response = await axiosInstance.post("/auth/login", credentials);
//     return response.data;
//   } catch (err: any) {
//     if (err instanceof AxiosError) {
//       console.error("Axios Error: ", err.response?.data || err.message);
//     } else {
//       console.error("Unknown Error: ", err);
//     }
//     throw err;
//   }
// };

// export const verifyOtp = async (otpData: {
//   identifier: string;
//   otp: string;
//   rememberDevice: boolean;
// }) => {
//   try {
//     const response = await axiosInstance.post("/auth/register", otpData);
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// };
};