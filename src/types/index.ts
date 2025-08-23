import type { ComponentType } from "react";

export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}
export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url: string;
        component: ComponentType;
    }[];
}

export const role = {
    admin: "ADMIN",
    sender: "SENDER",
    receiver: "RECEIVER",
};

export type TRole = "ADMIN" | "SENDER" | "RECEIVER";