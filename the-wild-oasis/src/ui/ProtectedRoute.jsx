import React, {useEffect} from 'react';
import {useUser} from "../features/authentication/useUser.js";
import styled from "styled-components";
import Spinner from "./Spinner.jsx";
import {useNavigate} from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;
function ProtectedRoute({children}) {
    const navigate = useNavigate();
    // 1. Load Authenticated User
    const {isLoading, isAuthenticated} = useUser();

    // 2. If there is NO authenticated User, redirect to Login Page
    useEffect(() => {
        if(!isAuthenticated && !isLoading){
            navigate('/login')
        }
    }, [isAuthenticated, isLoading, navigate]);
    
    // 3. While Loading, show a spinner
    if(isLoading) return <FullPage>
                <Spinner />
            </FullPage>
    
    // 4. If there is a User, render the app
    if(isAuthenticated) return children;
}

export default ProtectedRoute;