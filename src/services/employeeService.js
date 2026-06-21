import api from "../api/axios";

export const getEmployees = async () => {
  const response = await api.get("/api/Employee");
  return response.data;
};

export const createEmployee = async (data) => {
  const response = await api.post("/api/Employee", data);
  return response.data;
};

export const updateEmployee = async (id, data) => {
  const response = await api.patch(`/api/Employee/${id}`, data);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/api/Employee/${id}`);
  return response.data;
}