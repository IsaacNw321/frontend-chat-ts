import { useState, createContext, type Dispatch, type SetStateAction } from "react";

import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
interface AuthState {
    access_token?: string;
    [key: string]: any; 
}
  const axiosPrivate = useAxiosPrivate()
export interface AuthContextType {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
    handleLogout: () => Promise<void>; 
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({ access_token: 'MOCK_TOKEN_123' });
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            console.log("Logout initiated: Calling /auth/logout to clear HTTP-only cookie...");
            const response = await axiosPrivate.post('/auth/logout');
            console.log(response)
            setAuth({}); 
            navigate('/');
        } catch (err) {
            console.error("Logout API failed (Cookie might not have cleared):", err);
            setAuth({}); 
            navigate('/');
        }
    };

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;