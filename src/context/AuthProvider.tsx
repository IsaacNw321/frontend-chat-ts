import { useState, createContext, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/users";
import { Role } from "../types";

export interface AuthState {
  access_token?: string ;
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
  handleLogout: () => Promise<void>; 
}

export interface UseAuthReturnType {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
    handleLogout: () => Promise<void>;
    id: string | null;
    role: Role | null; 
}

export const AuthContext = createContext<Omit<AuthContextType, 'id' | 'role'> | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ access_token: '' });
  const navigate = useNavigate();
  
  const handleLogout = async () => {
   try {
      await apiClient.post('/auth/logout'); 
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