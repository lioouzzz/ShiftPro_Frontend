import api from "../api/axios";


export const getProfile = async () => {
  const response = await api.get("/api/Employee");

  return response.data;
};