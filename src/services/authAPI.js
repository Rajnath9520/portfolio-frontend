import api from "./api";

export const authAPI = {
  login: async (email, password) => {
    return await api.post("/auth/login", { email, password });
  }
};
