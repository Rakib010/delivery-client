//import AllUsers from "@/page/Admin/AllUsers";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AllUsers = lazy(() => import("@/page/Admin/AllUsers"))

export const adminSidebar: ISidebarItem[] = [

    {
        title: "Dashboard",
        items: [
            {
                title: "AllUser",
                url: "/admin/alluser",
                component: AllUsers
            },
        ],
    },
    /* another section */
    {
        title: "Management",
        items: []

    },
]