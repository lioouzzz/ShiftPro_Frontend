import api from "../api/axios";

export const login = async (account, password) => {
  const response = await api.post("/api/Auth/Login", {
    account,
    password,
  });

  return response.data;
};