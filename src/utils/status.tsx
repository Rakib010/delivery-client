import {
  Package,
  CheckCircle,
  Truck,
  XCircle,
  AlertCircle,
} from "react-feather";

export type ParcelStatus =
  | "requested"
  | "approved"
  | "dispatched"
  | "inTransit"
  | "delivered"
  | "cancelled"
  | string;

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "dispatched":
      return <Truck className="h-4 w-4 text-blue-500" />;
    case "inTransit":
      return <Truck className="h-4 w-4 text-amber-500" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Package className="h-4 w-4 text-gray-500" />;
  }
};

export const getStatusVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "default";
    case "dispatched":
      return "secondary";
    case "inTransit":
      return "outline";
    case "delivered":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

export const getRoleVariant = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "destructive";
    case "sender":
      return "secondary";
    case "receiver":
      return "secondary";
    default:
      return "outline";
  }
};

export const getStatusInfo = (status: string) => {
  switch (status) {
    case "delivered":
      return {
        variant: "default" as const,
        icon: <CheckCircle className="h-3 w-3" />,
        color: "text-green-500",
      };
    case "in_transit":
      return {
        variant: "secondary" as const,
        icon: <Truck className="h-3 w-3" />,
        color: "text-blue-500",
      };
    case "out_for_delivery":
      return {
        variant: "outline" as const,
        icon: <Truck className="h-3 w-3" />,
        color: "text-orange-500",
      };
    case "processing":
      return {
        variant: "secondary" as const,
        icon: <Package className="h-3 w-3" />,
        color: "text-gray-500",
      };
    default:
      return {
        variant: "outline" as const,
        icon: <AlertCircle className="h-3 w-3" />,
        color: "text-gray-500",
      };
  }
};
