import axios from "axios";

let API_URL = "http://";
let hostname = window.location.hostname;
API_URL +=
    process.env.NODE_ENV === "docker_dev"
        ? "api." + hostname + ".nip.io"
        : "localhost:9000";

let instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || API_URL,
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
