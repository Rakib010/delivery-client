import {
  useConfirmParcelDeliveryMutation,
  useIncomingParcelsQuery,
} from "@/redux/features/receiver/receiver.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { handleLoadingError } from "@/utils/ErrorHandle";
import { getStatusIcon, getStatusVariant } from "@/utils/status";

export default function ConfirmParcel() {
  const { data, isLoading, isError, refetch } =
    useIncomingParcelsQuery(undefined);
  const [confirmParcel, { isLoading: isConfirming }] =
    useConfirmParcelDeliveryMutation();

  const handleConfirmParcel = async (id: string) => {
    try {
      const res = await confirmParcel(id).unwrap();
      if (res.success) {
        toast.success("Parcel delivery confirmed successfully!");
        refetch();
      }
    } catch (error) {
      //console.error("Failed to confirm parcel:", error);
      toast.error("Failed to confirm parcel delivery");
    }
  };

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  return (
    <div className="container mx-auto p-6 font-mono ">
      <div className="mb-6">
        <p className="text-center text-3xl text-gray-900 dark:text-gray-200 mb-6">
          Confirm delivery of your incoming parcels
        </p>
      </div>

      {data?.data?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No incoming parcels found
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 ">
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">
                    Parcel Information
                  </th>
                  <th className="p-4 text-left font-medium"> Status</th>
                  <th className="p-4 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {data?.data?.map((parcel: any) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {parcel.type}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {parcel.trackingId}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            pickup Address: {parcel.pickupAddress}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* status */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(parcel.status)}
                        <Badge
                          variant={getStatusVariant(parcel.status)}
                          className="capitalize"
                        >
                          {parcel.status?.replace("_", " ") || "pending"}
                        </Badge>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        onClick={() => handleConfirmParcel(parcel._id)}
                        disabled={isConfirming || parcel.status === "delivered"}
                        className="gap-1"
                        variant={
                          parcel.status === "delivered"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {isConfirming ? (
                          <>Loading...</>
                        ) : parcel.status === "delivered" ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Confirmed
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Confirm Delivery
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
