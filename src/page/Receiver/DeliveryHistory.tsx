import { useDeliveryHistoryQuery } from "@/redux/features/receiver/receiver.api";
import {
  Package,
  Calendar,
  MapPin,
  User,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DeliveryHistory() {
  const { data, isLoading, isError } = useDeliveryHistoryQuery(undefined);

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

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          variant: "default" as const,
          color: "text-green-600",
        };
      case "DISPATCHED":
        return {
          icon: <Truck className="h-4 w-4" />,
          variant: "secondary" as const,
          color: "text-blue-600",
        };
      case "IN_TRANSIT":
        return {
          icon: <Truck className="h-4 w-4" />,
          variant: "outline" as const,
          color: "text-orange-600",
        };
      case "PENDING":
        return {
          icon: <Clock className="h-4 w-4" />,
          variant: "outline" as const,
          color: "text-gray-600",
        };
      case "CANCELLED":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          variant: "destructive" as const,
          color: "text-red-600",
        };
      default:
        return {
          icon: <Package className="h-4 w-4" />,
          variant: "outline" as const,
          color: "text-gray-600",
        };
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Delivery History</h1>
        <p className="text-muted-foreground">
          {data?.data?.length || 0} completed delivery(s)
        </p>
      </div>

      {!data?.data || data.data.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No delivery history</h3>
            <p className="text-muted-foreground text-center">
              You haven't received any parcels yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">Parcel</th>
                  <th className="p-4 text-left font-medium">Sender</th>
                  <th className="p-4 text-left font-medium">
                    Delivery Address
                  </th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((delivery: any) => {
                  const statusInfo = getStatusInfo(delivery.status);
                  return (
                    <tr
                      key={delivery._id}
                      className="border-b hover:bg-muted/30"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium capitalize">
                              {delivery.type}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {delivery.weight
                                ? `${delivery.weight} kg`
                                : "Weight not specified"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {delivery.sender?.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm max-w-xs">
                          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">
                            {delivery.deliveryAddress}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={statusInfo.variant}
                          className="flex items-center gap-1 w-fit"
                        >
                          {statusInfo.icon}
                          {delivery.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {delivery.deliveryDate
                            ? new Date(
                                delivery.deliveryDate
                              ).toLocaleDateString()
                            : "Not delivered"}
                        </div>
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
