import About from "@/page/About";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: About,
        children: [
            {
                path: "about",
                Component: About,
            }
        ]
    },
]);

