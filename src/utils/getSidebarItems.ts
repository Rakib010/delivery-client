import { adminSidebar } from "@/router/adminSidebar";
import { ReceiverSidebar } from "@/router/ReceiverSidebar";
import { SenderSidebar } from "@/router/SenderSidebar";
import { role, type TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.admin:
            return [...adminSidebar];
        case role.sender:
            return [...SenderSidebar];
        case role.receiver:
            return [...ReceiverSidebar];
        default:
            return [];
    }
};
