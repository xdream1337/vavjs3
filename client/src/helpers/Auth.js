import { createContext, useContext, useMemo } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

// toto mi zabralo asi 5 dni kym som pochopil ako to funguje a
// ako to mam pouzit, ale nakoniec to funguje :)
// nie je to moc najlepsie riesenie, ale stale sa pouzivaju JWT tokeny na middleware
const AuthContext = createContext(null);

export const useAuth = () => { return useContext(AuthContext) };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);
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