import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";


const ProtectedRoutes = ({ children }) => {

    const { user, navigate, setShowUserLogin } = useContext(ShopContext);

    useEffect(() => {
        if (!user) {
            navigate('/');
            setShowUserLogin(true);
        }
    }, [user]);

    if (!user) return null;

    return <>{children}</>;
}

export default ProtectedRoutes;