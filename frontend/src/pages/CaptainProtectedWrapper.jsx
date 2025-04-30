import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CaptainProtectedWrapper({ children }) {
    const cToken = localStorage.getItem('cToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!cToken) {
            navigate('/captain/login');
        }
    }, [cToken]);

    return (
        <>
            {children}
        </>
    );
}

export default CaptainProtectedWrapper;