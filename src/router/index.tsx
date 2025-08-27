import { Role } from "../../../delivery-server/src/app/modules/user/user.interface";
import App from "@/App";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/page/About";
import Login from "@/page/auth/Login";
import Register from "@/page/auth/Register";
import Contact from "@/page/Contact";
import Home from "@/page/Home/Home";
import Unauthorized from "@/page/Unauthorized";
import { role, type TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter } from "react-router";
import { adminSidebar } from "./adminSidebar";
import { SenderSidebar } from "./SenderSidebar";
import { ReceiverSidebar } from "./ReceiverSidebar";
import ParcelTracking from "@/page/ParcelTracking";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/tracking",
        Component: ParcelTracking,
      },
    ],
  },
  /* Dashboard Admin*/
  {
    Component: withAuth(DashboardLayout, role.admin as Role),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebar),
    ],
  },

  /* Dashboard Sender */
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/view-parcel" /> },
      ...generateRoutes(SenderSidebar),
    ],
  },
  /* Dashboard Receiver */
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/incoming-parcel" /> },
      ...generateRoutes(ReceiverSidebar),
    ],
  },

  /*  */
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
