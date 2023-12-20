import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";

const MyAdsPage = () => {
    return (<div>
        <h1>P2P Page <span style={{ fontSize: 16 }}><Link to='/'>root page</Link></span></h1>
        <div style={{ display: "flex", gap: 5 }}>
            <NavLink to='/p2p/buy-sell?type=buy' className={({ isActive }) => isActive ? "active-tab" : ""} ><button>Buy and Sell</button></NavLink>
            <NavLink to='/p2p/orders' className={({ isActive }) => isActive ? "active-tab" : ""}> <button>Orders</button></NavLink>
            <NavLink to='/p2p/my-ads' className={({ isActive }) => isActive ? "active-tab" : ""}> <button>My Ads</button></NavLink>
            <NavLink to='/p2p/my-profile' className={({ isActive }) => isActive ? "active-tab" : ""}><button>My Profile</button></NavLink>
        </div>
        <div id="p2p-root" style={{ padding: 15 }}>
            <Outlet />
        </div>
    </div>);
};

export default MyAdsPage;
