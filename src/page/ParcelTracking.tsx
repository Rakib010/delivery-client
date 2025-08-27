/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTrackingParcelQuery } from "@/redux/features/admin/admin.api";
import { Search, Package, Clock } from "react-feather";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { handleLoadingError } from "@/utils/ErrorHandle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusIcon } from "@/utils/status";

export default function ParcelTracking() {
  const [submittedTrackingId, setSubmittedTrackingId] = useState("");

  const form = useForm({
    defaultValues: {
      trackingId: "",
    },
  });

  const {
    data: parcelData,
    isLoading,
    isError,
  } = useTrackingParcelQuery(submittedTrackingId, {
    skip: !submittedTrackingId,
  });

  const handleSubmit = (data: { trackingId: string }) => {
    setSubmittedTrackingId(data.trackingId);
  };

  useEffect(() => {
    if (parcelData) {
      //console.log("Parcel Data:", parcelData);
    }
  }, [parcelData]);

  // loading/error
  const loadingErrorUI = handleLoadingError(isLoading, isError);

  return (
    <section className="py-12 bg-stone-50 dark:bg-stone-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100 mb-4">
            Track Your Parcel
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Enter your tracking ID to get real-time updates on your package
            delivery status
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <FormField
                control={form.control}
                name="trackingId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="text-stone-400" size={20} />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your tracking ID"
                          className="w-full pl-10 pr-4 py-3 border-stone-300 dark:border-stone-600 rounded-lg focus-visible:ring-amber-500 dark:bg-stone-800"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-3 px-8 rounded-lg transition flex items-center justify-center min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Clock className="animate-spin mr-2" size={18} />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2" size={18} />
                    Track
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Show loading or error state */}
        {isLoading || isError ? loadingErrorUI : null}

        {/* Parcel Data Display */}
        {parcelData && parcelData.data && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Parcel Summary Card */}
            <Card className="border rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-semibold">
                    Parcel Details
                  </CardTitle>
                  <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-lg">
                    {getStatusIcon(parcelData.data.status)}
                    <span className="font-medium text-amber-800 dark:text-amber-200 capitalize">
                      {parcelData.data.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-700 dark:text-stone-200">
                <div>
                  <h4 className="font-medium mb-1">Tracking ID</h4>
                  <p className="font-mono">{submittedTrackingId}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Parcel Type</h4>
                  <p>{parcelData.data.type}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Delivery Address</h4>
                  <p>{parcelData.data.deliveryAddress || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Weight & Fee</h4>
                  <p>
                    {parcelData.data.weight} kg | Fee: ${parcelData.data.fee}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline Card */}
            <Card className="border rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">
                  Status History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {parcelData.data.trackingEvents.map(
                  (log: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 p-3 border border-stone-200 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-900"
                    >
                      <div className="flex-shrink-0">
                        {getStatusIcon(log.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium capitalize">
                            {log.status.replace("_", " ")}
                          </span>
                          <span className="text-sm text-stone-500 dark:text-stone-400">
                            {log.timestamp
                              ? new Date(log.timestamp).toLocaleString()
                              : "No timestamp"}
                          </span>
                        </div>
                        {log.note && (
                          <p className="text-sm bg-stone-100 dark:bg-stone-800 p-2 rounded-lg">
                            {log.note}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Show empty state when no search has been made */}
        {!submittedTrackingId && !isLoading && !parcelData && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <Package className="mx-auto text-stone-400 mb-4" size={48} />
            <p className="text-stone-600 dark:text-stone-400">
              Enter a tracking ID above to see your parcel details
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
