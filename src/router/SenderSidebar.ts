import createParcel from "@/page/Sender/createParcel";
import type { ISidebarItem } from "@/types";

export const SenderSidebar: ISidebarItem[] = [
    {
        title: "Sender",
        items: [
            {
                title: "Sender",
                url: "/sender/createParcel",
                component: createParcel
            },
        ],
    },

]