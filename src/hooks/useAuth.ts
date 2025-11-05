import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthProvider";

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default useAuth;