import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) navigate('/')
    }, [isAuthenticated, navigate]);
    
    return isAuthenticated ? children : null
}