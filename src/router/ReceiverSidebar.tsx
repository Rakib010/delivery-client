import ViewParcel from "@/page/Receiver/ViewParcel";
import type { ISidebarItem } from "@/types";

export const ReceiverSidebar: ISidebarItem[] = [
  {
    title: "Receiver",
    items: [
      {
        title: "Receiver",
        url: "/receiver/view-parcel",
        component: ViewParcel,
      },
    ],
  },
];
