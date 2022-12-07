import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../helpers/Auth";

export const RequireAuth = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {outlet}
        </div>
    );

};

export default RequireAuth;
