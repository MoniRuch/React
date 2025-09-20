import React from 'react';
import styled from "styled-components";

const StyledHeader = styled.header`
    border-bottom: 1px solid var(--color-grey-100);
    background: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
`;
function Header() {
    return (
        <StyledHeader>
            Header
        </StyledHeader>
    );
}

export default Header;