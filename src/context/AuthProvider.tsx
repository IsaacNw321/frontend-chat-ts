import { useState, createContext, type Dispatch, type SetStateAction } from "react";

interface AuthState {
    access_token?: string;
    [key: string]: any; 
}

export interface AuthContextType {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({});

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;