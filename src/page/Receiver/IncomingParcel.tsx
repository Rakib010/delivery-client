/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIncomingParcelsQuery } from "@/redux/features/receiver/receiver.api";
import {
  Package,
  Truck,
  Clock,
  AlertCircle,
  Phone,
  Navigation,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function IncomingParcel() {
  const { data, isLoading, isError } = useIncomingParcelsQuery(undefined);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Failed to load parcels</p>
      </div>
    );

  // Combined status icon and styling
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "DISPATCHED":
        return {
          icon: <Truck className="h-4 w-4" />,
          variant: "secondary" as const,
          textColor: "text-blue-600",
          bgColor: "bg-blue-100",
        };
      case "DELIVERED":
        return {
          icon: <Package className="h-4 w-4" />,
          variant: "default" as const,
          textColor: "text-green-600",
          bgColor: "bg-green-100",
        };
      case "IN_TRANSIT":
        return {
          icon: <Truck className="h-4 w-4" />,
          variant: "outline" as const,
          textColor: "text-orange-600",
          bgColor: "bg-orange-100",
        };
      case "PENDING":
        return {
          icon: <Clock className="h-4 w-4" />,
          variant: "outline" as const,
          textColor: "text-gray-600",
          bgColor: "bg-gray-100",
        };
      case "CANCELLED":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          variant: "destructive" as const,
          textColor: "text-red-600",
          bgColor: "bg-red-100",
        };
      default:
        return {
          icon: <Package className="h-4 w-4" />,
          variant: "outline" as const,
          textColor: "text-gray-600",
          bgColor: "bg-gray-100",
        };
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Incoming Parcels</h1>
        <p className="text-muted-foreground">
          {data?.data?.length || 0} parcel(s) heading your way
        </p>
      </div>

      {!data?.data || data.data.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No incoming parcels</h3>
            <p className="text-muted-foreground text-center">
              You don't have any parcels being sent to you at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b ">
                  <th className="p-4 text-left font-medium">Type</th>
                  <th className="p-4 text-left font-medium">Phone</th>
                  <th className="p-4 text-left font-medium">
                    Delivery Address
                  </th>
                  <th className="p-4 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((parcel: any) => {
                  const statusInfo = getStatusInfo(parcel.status);
                  return (
                    <tr key={parcel._id} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium capitalize">
                            {parcel.type}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {parcel.phoneNumber}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm max-w-xs">
                          <Navigation className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">
                            {parcel.deliveryAddress}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={statusInfo.variant}
                          className="flex items-center gap-1 w-fit"
                        >
                          {statusInfo.icon}
                          {parcel.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
