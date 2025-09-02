import React from 'react';
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header() {
    return (
        <header>
            Fast React Pizza Co.
            <SearchOrder />
        </header>
    );
}

export default Header;