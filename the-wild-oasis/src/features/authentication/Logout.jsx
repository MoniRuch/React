import React from 'react';
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {useLogout} from "./useLogout.js";

function Logout() {
    const {logout, isLoading} = useLogout();
    
    return (
        <ButtonIcon disabled={isLoading} onClick={logout}>
            <HiArrowRightOnRectangle />
        </ButtonIcon>
    );
}

export default Logout;