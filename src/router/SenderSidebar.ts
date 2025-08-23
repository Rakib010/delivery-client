import CancelParcel from "@/page/Sender/CancelParcel";
import createParcel from "@/page/Sender/createParcel";
import ViewParcels from "@/page/Sender/ViewParcels";
import type { ISidebarItem } from "@/types";

export const SenderSidebar: ISidebarItem[] = [
    {
        title: "Sender",
        items: [
            {
                title: "Create parcel delivery",
                url: "/sender/create-parcel",
                component: createParcel
            },
            {
                title: "Cancel parcel",
                url: "/sender/cancel-parcel",
                component: CancelParcel
            },
            {
                title: "View all parcels",
                url: "/sender/view-parcel",
                component: ViewParcels
            },
        ],
    },

]