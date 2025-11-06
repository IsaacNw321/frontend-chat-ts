import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthProvider";
import { jwtDecode } from 'jwt-decode';
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { auth, setAuth, handleLogout } = context
    const at = auth?.access_token
    const getUserIdFromToken = (token: string | undefined):string | null => {
        if (!token) return null;
        try {
            const decodedPayload = jwtDecode<{ sub: string }>(token);
            return decodedPayload.sub;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };
    const id = getUserIdFromToken(at);
    const newContext = {auth, setAuth, id, handleLogout}
    return newContext 
};

export default useAuth;