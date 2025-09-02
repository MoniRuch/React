import React from 'react';
import Header from "./Header.jsx";
import {Outlet, useNavigation} from "react-router-dom";
import CartOverview from "../features/cart/CartOverview.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
    return (
        <div className="layout">
            {isLoading && <LoadingIndicator />}
            <Header />
            
            <main>
                <Outlet />
            </main>
            
            <CartOverview />
        </div>
    );
}

export default AppLayout;