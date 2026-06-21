import api from "../api/axios";

export const schedule = async () => {
  const response = await api.get("/api/Schedule");

  return response.data;
};