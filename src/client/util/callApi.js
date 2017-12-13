import axios from "axios";

let API_URL = "http://localhost:9000";

let instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || API_URL,
    timeout: 5000,
    withCredentials: true
});

export const callApi = (endpoint, method = "post", body) => {
    switch (method) {
        case "post":
            return instance.post(endpoint, body);
        case "delete":
            return instance.delete(endpoint);
        default:
            return instance.get(endpoint);
    }
};
