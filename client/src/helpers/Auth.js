import { createContext, useContext, useMemo } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";


const AuthContext = createContext(null);

export const useAuth = () => { return useContext(AuthContext) };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);

        // todo: navigate admin to admin page
        if (data.role === "admin") navigate("/admin");
        navigate("/stats");
    }

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};