import { useContext } from "react";
import { AuthContext, type UseAuthReturnType } from "../context/AuthProvider";
import { Role } from "../types";
import { jwtDecode } from 'jwt-decode';
interface TokenPayload {
    sub: string;
    role: Role; 
}

const useAuth = (): UseAuthReturnType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth, setAuth, handleLogout } = context;
  const at = auth?.access_token;

  const getTokenPayload = (token: string | undefined): { id: string | null, role: Role | null } => {
    if (!token) return { id: null, role: null };
    
    try {
      const decodedPayload = jwtDecode<TokenPayload>(token);
      return {
        id: decodedPayload.sub,
        role: decodedPayload.role, 
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return { id: null, role: null };
    }
  };
  const { id, role } = getTokenPayload(at);

  const newContext = {
        auth, 
        setAuth, 
        handleLogout, 
        id, 
        role 
    };
    
  return newContext as UseAuthReturnType; 
};

export default useAuth;