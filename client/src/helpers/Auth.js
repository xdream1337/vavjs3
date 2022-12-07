import { createContext, useContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => { return useContext(AuthContext) };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }
};