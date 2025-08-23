//import AllUsers from "@/page/Admin/AllUsers";
import AllParcels from "@/page/Admin/AllParcels";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AllUsers = lazy(() => import("@/page/Admin/AllUsers"))

export const adminSidebar: ISidebarItem[] = [

    {
        title: "Admin panel",
        items: [
            {
                title: "All User",
                url: "/admin/all-user",
                component: AllUsers
            },
            {
                title: "All Parcel",
                url: "/admin/all-parcel",
                component: AllParcels
            },
        ],
    },

]