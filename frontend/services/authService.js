import baseService from "./baseService";
import { store } from "../redux/store";
import {
    login as loginAction,
    register as registerAction,
    logout as logoutAction,
    setLoading,
    setError,
} from "../redux/features/authSlice";

// Utility function to handle errors
const handleError = (error) => {
    const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
    store.dispatch(setError(message));
    return { success: false, message };
};

const authService = {
    login: async (credentials) => {
        try {
            store.dispatch(setLoading(true));
            const response = await baseService.post("/auth/login", credentials);
            const { user, tokens } = response.data.data;
            store.dispatch(loginAction({ user, tokens }));
            return { success: true, user, tokens };
        } catch (error) {
            return handleError(error);
        }
    },

    register: async (userData) => {
        try {
            store.dispatch(setLoading(true));
            const response = await baseService.post("/auth/register", userData);
            const { user, tokens } = response.data.data;
            store.dispatch(registerAction({ user, tokens }));
            return { success: true, user, tokens };
        } catch (error) {
            return handleError(error);
        }
    },

    logout: () => {
        store.dispatch(logoutAction());
        return { success: true };
    },

    getallUsers: async (token) => {
        try {
            const response = await baseService.get("/auth/all", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            const { status, data } = response.data;
            return { success: true, status, data };
        } catch (error) {
            return handleError(error);
        }
    }
};

export default authService;
