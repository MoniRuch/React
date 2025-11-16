import React from 'react';
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/authentication/UserAvatar.jsx";

const StyledHeader = styled.header`
    border-bottom: 1px solid var(--color-grey-100);
    background: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    display: flex;
    gap: 2.6rem;
    align-items: center;
    justify-content: flex-end;
`;
function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;