//import AllUsers from "@/page/Admin/AllUsers";
import AllParcels from "@/page/Admin/AllParcels";
import Analytics from "@/page/Admin/Analytics";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AllUsers = lazy(() => import("@/page/Admin/AllUsers"))

export const adminSidebar: ISidebarItem[] = [
    {
        title: "Admin panel",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics,
                isActive: undefined,
            },
        ],
    },
    {
        title: "User Panel",
        items: [
            {
                title: "All User",
                url: "/admin/all-user",
                component: AllUsers,
                isActive: undefined,
            },
            {
                title: "All Parcel",
                url: "/admin/all-parcel",
                component: AllParcels,
                isActive: undefined,
            },
        ],
    },

]