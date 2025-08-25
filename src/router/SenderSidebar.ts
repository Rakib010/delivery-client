import CancelParcel from "@/page/Sender/CancelParcel";
import CreateParcel from "@/page/Sender/CreateParcel";
import ViewParcels from "@/page/Sender/ViewParcels";
import type { ISidebarItem } from "@/types";

export const SenderSidebar: ISidebarItem[] = [
    {
        title: "Sender",
        items: [
            {
                title: "Create parcel delivery",
                url: "/sender/create-parcel",
                component: CreateParcel,
                isActive: undefined
            },
            {
                title: "Cancel parcel",
                url: "/sender/cancel-parcel",
                component: CancelParcel,
                isActive: undefined
            },
            {
                title: "View all parcels",
                url: "/sender/view-parcel",
                component: ViewParcels,
                isActive: undefined
            },
        ],
    },

]