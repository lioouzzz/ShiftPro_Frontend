import api from "../api/axios";

export const getProfile = async () => {
  const response = await api.get("/api/Employee/me");

  return response.data;
};

export const updateProfile = async (id, data) => {
  const response = await api.patch(
    `/api/Employee/${id}`,
    data
  );

  return response.data;
};