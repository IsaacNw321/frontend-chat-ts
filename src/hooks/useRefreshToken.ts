import { apiClient } from "../utils/users";
import useAuth from "./useAuth";
const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const controller = new AbortController() 
    const refresh = async () => {
        const response = await apiClient.post('/auth/refresh', {
            signal : controller.signal
        });
        setAuth(prev => {
            return { ...prev, access_token: response.data.access_token };
        });
        return response.data.access_token;
    };

    return refresh;
};

export default useRefreshToken;