import { jwtDecode } from "jwt-decode";

export const getEmployeeIdFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("尚未登入");
  }

  const decoded = jwtDecode(token);

  return Number(
    decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  );
};