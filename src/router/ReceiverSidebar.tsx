import ConfirmParcel from "@/page/Receiver/ConfirmParcel";
import DeliveryHistory from "@/page/Receiver/DeliveryHistory";
import IncomingParcel from "@/page/Receiver/IncomingParcel";
import type { ISidebarItem } from "@/types";

export const ReceiverSidebar: ISidebarItem[] = [
  {
    title: "Receiver",
    items: [
      {
        title: "Incoming Parcels",
        url: "/receiver/incoming-parcel",
        component: IncomingParcel,
        isActive: undefined,
      },
      {
        title: "Confirm Parcel",
        url: "/receiver/confirm-parcel",
        component: ConfirmParcel,
        isActive: undefined,
      },
      {
        title: "Delivery History",
        url: "/receiver/delivery-history",
        component: DeliveryHistory,
        isActive: undefined,
      },
    ],
  },
];
