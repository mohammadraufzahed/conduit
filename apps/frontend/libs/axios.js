import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (typeof jwt == "string")
    config.headers.set("Authorization", `Bearer ${JSON.parse(jwt).jwt}`);
  return config;
});

export default httpClient;
