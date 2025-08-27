import { useDeliveryHistoryQuery } from "@/redux/features/receiver/receiver.api";
import { Package, Calendar, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusInfo } from "@/utils/status";
import { handleLoadingError } from "@/utils/ErrorHandle";

export default function DeliveryHistory() {
  const { data, isLoading, isError } = useDeliveryHistoryQuery(undefined);

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  return (
    <div className="container mx-auto  px-4 font-mono">
      <div className="flex flex-col gap-2 mb-6 text-center">
        <p className="text-3xl my-4 text-gray-900 dark:text-gray-200">
          {data?.data?.length || 0} completed delivery
          <span className="text-orange-400">s</span>
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
                  <th className="p-4 text-left font-medium">Sender/Receiver</th>
                  <th className="p-4 text-left font-medium">Pickup/Delivery</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Date</th>
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
                      {/* Parcel Column */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium capitalize">
                              {delivery.type || "Package"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {delivery.trackingId && (
                                <span className="font-mono">
                                  ID: {delivery.trackingId}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Sender/Receiver Column */}
                      <td className="p-4">
                        <div className="space-y-2">
                          {delivery.sender && (
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="font-medium">
                                  From: {delivery.sender.name}
                                </div>
                              </div>
                            </div>
                          )}
                          {delivery.receiver && (
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-green-500" />
                              <div>
                                <div className="font-medium">
                                  To: {delivery.receiver.name}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Pickup/Delivery Column */}
                      <td className="p-4">
                        <div className="space-y-2">
                          {delivery.pickupAddress && (
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium">Pickup:</div>
                                <div className="text-muted-foreground break-words max-w-xs">
                                  {delivery.pickupAddress}
                                </div>
                              </div>
                            </div>
                          )}
                          {delivery.deliveryAddress && (
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium">Delivery:</div>
                                <div className="text-muted-foreground break-words max-w-xs">
                                  {delivery.deliveryAddress}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="p-4">
                        <Badge
                          variant={statusInfo.variant}
                          className="flex items-center gap-1 w-fit capitalize"
                        >
                          {statusInfo.icon}
                          {delivery.status?.replace("_", " ") || "completed"}
                        </Badge>
                        {delivery.deliveryNotes && (
                          <div className="text-xs text-muted-foreground mt-1 max-w-xs">
                            📝 {delivery.deliveryNotes}
                          </div>
                        )}
                      </td>

                      {/* Date Column */}
                      <td className="p-4">
                        <div className="space-y-1 text-sm">
                          {delivery.updatedAt && (
                            <div className="text-xs flex gap-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(
                                delivery.updatedAt
                              ).toLocaleDateString()}
                            </div>
                          )}
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
