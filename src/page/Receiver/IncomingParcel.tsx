/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIncomingParcelsQuery } from "@/redux/features/receiver/receiver.api";
import {
  Package,
  Clock,
  MapPin,
  User,
  Calendar,
  Phone,
  Navigation,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { handleLoadingError } from "@/utils/ErrorHandle";
import { getStatusInfo } from "@/utils/status";

export default function IncomingParcel() {
  const { data, isLoading, isError } = useIncomingParcelsQuery(undefined);
  console.log("Parcel Data:", data);

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  return (
    <div className="container mx-auto px-4 font-mono">
      <div className="flex flex-col gap-2 mb-6 text-center text-gray-900 dark:text-gray-200">
        <h1 className="text-3xl">Incoming Parcels</h1>
        <p className="text-xl">
          {data?.data?.length || 0} parcels heading your way
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
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">
                    Parcel Information
                  </th>
                  <th className="p-4 text-left font-medium">Sender Details</th>
                  <th className="p-4 text-left font-medium">
                    Delivery Details
                  </th>
                  <th className="p-4 text-left font-medium">Timeline</th>
                  <th className="p-4 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((parcel: any) => {
                  const statusInfo = getStatusInfo(parcel.status);
                  return (
                    <tr key={parcel._id} className="border-b hover:bg-muted/30">
                      {/* Parcel Information */}
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                            <Package className="h-5 w-5 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium capitalize">
                              {parcel.type || "Package"}
                            </div>
                            {parcel.trackingId && (
                              <div className="text-sm text-muted-foreground font-mono">
                                Track ID: {parcel.trackingId}
                              </div>
                            )}
                            {parcel.description && (
                              <div className="text-sm text-muted-foreground">
                                {parcel.description}
                              </div>
                            )}
                            {parcel.weight && (
                              <div className="text-sm text-muted-foreground">
                                Weight: {parcel.weight} kg
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Sender Details */}
                      <td className="p-4">
                        <div className="space-y-2">
                          {parcel.sender && (
                            <>
                              <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {parcel.sender.name || "Unknown Sender"}
                                </span>
                              </div>
                              {parcel.sender.email && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="h-4 w-4" />
                                  {parcel.sender.email}
                                </div>
                              )}
                              {parcel.sender.phone && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="h-4 w-4" />
                                  {parcel.sender.phone}
                                </div>
                              )}
                              {parcel.sender.address && (
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span className="break-words max-w-xs">
                                    {parcel.sender.address}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                          {!parcel.sender && parcel.senderContact && (
                            <div className="text-sm text-muted-foreground">
                              Contact: {parcel.senderContact}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Delivery Details */}
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="break-words max-w-xs">
                              {parcel.deliveryAddress || "No address provided"}
                            </span>
                          </div>
                          {parcel.pickupAddress && (
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Navigation className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span className="break-words max-w-xs">
                                Pickup: {parcel.pickupAddress}
                              </span>
                            </div>
                          )}
                          {parcel.currentLocation && (
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Navigation className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span className="break-words max-w-xs">
                                Current: {parcel.currentLocation}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Timeline */}
                      <td className="p-4">
                        <div className="space-y-1 text-sm">
                          {parcel.sendDate && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              Sent:{" "}
                              {new Date(parcel.sendDate).toLocaleDateString()}
                            </div>
                          )}
                          {parcel.estimatedDelivery && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              Est:{" "}
                              {new Date(
                                parcel.estimatedDelivery
                              ).toLocaleDateString()}
                            </div>
                          )}
                          {parcel.createdAt && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              Created:{" "}
                              {new Date(parcel.createdAt).toLocaleDateString()}
                            </div>
                          )}
                          {parcel.updatedAt && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              Updated:{" "}
                              {new Date(parcel.updatedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <Badge
                          variant={statusInfo.variant}
                          className="flex items-center gap-1 w-fit capitalize"
                        >
                          {statusInfo.icon}
                          {parcel.status?.replace("_", " ") || "pending"}
                        </Badge>
                        {parcel.deliveryNotes && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Note: {parcel.deliveryNotes}
                          </div>
                        )}
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
