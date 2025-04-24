import axios from "axios";
import { store } from "../redux/store";
import { clearAuth, setrefreshToken } from "../redux/features/authSlice";
const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL || "https://team-collab-1.onrender.com"}/api`;

console.log("BASE_URL", BASE_URL);

const baseService = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,

    headers: {
        "Content-Type": "application/json"
    },
});

const refreshTokenService = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json"
    },
});

refreshTokenService.interceptors.response.use(
    (response) => response,
    (error) => {
        store.dispatch(clearAuth());
        return Promise.reject(error);
    }
);

baseService.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;
        if (response && response.status === 400) {
            const { auth } = store.getState();
            try {
                const refreshResponse = await refreshTokenService.get("/refreshToken", {
                    headers: {
                        "x-auth-token": auth.refreshToken,
                    },
                });
                store.dispatch(setrefreshToken(refreshResponse?.data?.data));
                config.headers["x-auth-token"] = refreshResponse?.data?.data.token;
                config.baseURL = undefined;

                return baseService.request(error.config);
            } catch (refreshError) {
                store.dispatch(clearAuth());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default baseService;