import axios from "../../node_modules/axios/index";
//import Config from "@/Config";
import Config from "@/config/index";
// Create an Axios instance
const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const newConfig = { ...config }; // crear una copia de config
        newConfig.headers.Authorization = `Bearer ${
            process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;
        newConfig.headers.Accept = "application/json";
        console.log("Making request to: ", newConfig.url);
        return newConfig;
    },
    (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

// Respond Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

export default api;
