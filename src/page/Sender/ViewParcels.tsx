/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetParcelsQuery } from "@/redux/features/sender/sender.api";
import { Package, Calendar, Scale, CreditCard, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { handleLoadingError } from "@/utils/ErrorHandle";

export default function ViewParcels() {
  const { data, isLoading, isError } = useGetParcelsQuery(undefined);

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  return (
    <div className="container mx-auto px-4 font-mono">
      <div className="flex flex-col gap-2 mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">All Parcels</h1>
        <p className="text-muted-foreground">
          Manage and track all parcels in the system
        </p>
      </div>

      {data?.data?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No parcels found</h3>
            <p className="text-muted-foreground text-center">
              Get started by creating your first parcel delivery request.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">Parcel Details</th>
                  <th className="p-4 text-left font-medium min-w-[150px]">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Receiver
                    </div>
                  </th>
                  <th className="p-4 text-left font-medium min-w-[100px]">
                    <div className="flex items-center gap-1">
                      <Scale className="h-4 w-4" />
                      Weight
                    </div>
                  </th>
                  <th className="p-4 text-left font-medium min-w-[100px]">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4" />
                      Fee
                    </div>
                  </th>
                  <th className="p-4 text-left font-medium min-w-[180px]">
                    Status History
                  </th>
                  <th className="p-4 text-left font-medium min-w-[140px]">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Delivery Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((parcel: any) => (
                  <tr key={parcel._id} className="border-b hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium capitalize">
                            {parcel.type}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {parcel._id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{parcel.receiver?.name ?? parcel.receiver}</span>
                      </div>
                    </td>
                    <td className="p-4">{parcel.weight} kg</td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                      >
                        {parcel.fee} BDT
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">{parcel.status}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(parcel.deliveryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
