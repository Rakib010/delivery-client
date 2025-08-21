import App from "@/App";
import About from "@/page/About";
import Login from "@/page/auth/Login";
import Register from "@/page/auth/Register";
import Contact from "@/page/Contact";
import Home from "@/page/Home/Home";
import { createBrowserRouter } from "react-router";

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
            }
        ]
    },
    {
        path: "/login",
        Component: Login,

    },
    {
        path: "/register",
        Component: Register,

    }
]);

