import ConfirmParcel from "@/page/Receiver/ConfirmParcel";
import DeliveryHistory from "@/page/Receiver/DeliveryHistory";
import IncomingParcel from "@/page/Receiver/IncomingParcel";
import type { ISidebarItem } from "@/types";

export const ReceiverSidebar: ISidebarItem[] = [
  {
    title: "Receiver",
    items: [
      {
        title: "View incoming parcels",
        url: "/receiver/incoming-parcel",
        component: IncomingParcel,
        isActive: undefined,
      },
      {
        title: "Confirm parcel delivery",
        url: "/receiver/confirm-parcel",
        component: ConfirmParcel,
        isActive: undefined,
      },
      {
        title: "View delivery history",
        url: "/receiver/delivery-history",
        component: DeliveryHistory,
        isActive: undefined,
      },
    ],
  },
];
