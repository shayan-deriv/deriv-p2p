import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Root from "./routes/root";
import P2PHomePage from "./pages/home";
import ErrorPage from "./pages/404";
import BuySellPage from './pages/buy-sell';
import OrdersPage from './pages/orders';
import MyAdsPage from './pages/my-ads';
import MyProfilePage from './pages/my-profile';
import AdvertiserPage from './pages/advertiser';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
  },

  {
    path: "/p2p",
    Component: P2PHomePage,
    children: [
      {
        path: "/p2p",
        element: <Navigate to="/p2p/buy-sell?type=buy" />,
      },
      {
        path: "/p2p/buy-sell",

        Component: BuySellPage,
      },
      {
        path: "/p2p/orders",
        Component: OrdersPage,
      },
      {
        path: "/p2p/my-ads",
        Component: MyAdsPage,
      },
      {
        path: "/p2p/my-profile",
        Component: MyProfilePage,
      },
      {
        path: "/p2p/advertisers/:id",
        Component: AdvertiserPage,
      },
      {
        path: "/p2p/buy-sell/buy",
        Component: BuySellPage,
      },
      {
        path: "/p2p/buy-sell/sell",
        Component: BuySellPage,
      },
    ],

  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
