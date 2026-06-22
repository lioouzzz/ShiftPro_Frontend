import api from "../api/axios";
import { getEmployeeIdFromToken } from "../utils/auth";


export const getMySchedule = async (year, month) => {
  const response = await api.get(
    "api/Schedule/me"
  );
  return response.data;
}

export const getMonthlySchedules = async (year, month) => {
  const response = await api.get(
    `api/Schedule/Monthly?year=${year}&month=${month}`
  );

  return response.data;
};

export const createSchedule = async (data) => {
  const response = await api.post("/api/Schedule", data);
  return response.data;
};

export const updateSchedule = async (id, data) => {
  const response = await api.patch(`/api/Schedule/${id}`, data);
  return response.data;
};

export const deleteSchedule = async (id) => {
  const response = await api.delete(`/api/Schedule/${id}`);
  return response.data;
}



export const createMySchedule = async (workDate) => {
  const employeeId = getEmployeeIdFromToken();

  const response = await api.post("/api/Schedule", {
    employeeId,
    workDate,
  });

  return response.data;
};


export const getreport = async (year, month) => {
  const response = await api.get(
    `api/Schedule/EmployeeReport?year=${year}&month=${month}`
  );

  return response.data;
};
