/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetParcelsQuery,
  useCancelParcelMutation,
} from "@/redux/features/sender/sender.api";
import { Loader2, Package, XCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getStatusIcon, getStatusVariant } from "@/utils/status";
import { handleLoadingError } from "@/utils/ErrorHandle";

export default function SenderParcels() {
  const { data, isLoading, isError } = useGetParcelsQuery(undefined);
  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();

  const handleCancel = async (id: string) => {
    try {
      const res = await cancelParcel(id).unwrap();
      if (res.success) {
        toast.success("Parcel cancelled successfully!");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to cancel parcel");
    }
  };

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  return (
    <div className="container mx-auto px-4 font-mono">
      <div className="flex flex-col gap-2 mb-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight my-4">
          My Parcels
        </h1>
      </div>

      {data?.data?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No parcels yet</h3>
            <p className="text-muted-foreground text-center">
              Get started by creating a new parcel.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">Parcel Type</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Delivery Date</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((parcel: any) => (
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
                            ID: {parcel.trackingId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(parcel.status)}
                        <Badge variant={getStatusVariant(parcel.status)}>
                          {parcel.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(parcel.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="text-center">
                      {parcel.status !== "DISPATCHED" &&
                      parcel.status !== "CANCELLED" ? (
                        <Button
                          onClick={() => handleCancel(parcel._id)}
                          disabled={isCancelling}
                          variant="destructive"
                          size="sm"
                          className="gap-1 "
                          
                        >
                          {isCancelling ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="destructive"
                          size="sm"
                          className="gap-1 opacity-50"
                        >
                          <XCircle className="h-4 w-4 " />
                          Cancelled
                        </Button>
                      )}
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
