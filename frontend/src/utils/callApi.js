import axios from "axios";

let instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
  withCredentials: true
});

export const callApi = (endpoint, method = "get", body) => {
  switch (method) {
    case "post":
      return instance.post(endpoint, body);
    case "put":
      return instance.put(endpoint, body);
    case "delete":
      return instance.delete(endpoint);
    default:
      return instance.get(endpoint);
  }
};
