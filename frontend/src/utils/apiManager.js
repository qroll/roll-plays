import axios from "axios";

let instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    withCredentials: true
});

class ApiManager {
    static get(endpoint) {
        return instance.get(endpoint);
    }

    static post(endpoint, body) {
        return instance.post(endpoint, body);
    }

    static put(endpoint, body) {
        return instance.put(endpoint, body);
    }

    static delete(endpoint) {
        return instance.delete(endpoint);
    }
}

export default ApiManager;
