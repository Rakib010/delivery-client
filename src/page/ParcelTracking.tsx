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
import { getStatusIcon} from "@/utils/status";

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
      console.log("Parcel Data:", parcelData);
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

        {parcelData && parcelData.data && (
          <div className="max-w-4xl mx-auto">
            {/* Package Summary Card */}
            <Card className="mb-8">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-2xl">Parcel Details</CardTitle>
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    {getStatusIcon(parcelData.data.type)}
                    <span className="font-semibold text-amber-800 dark:text-amber-200">
                      {getStatusText(parcelData.data.type)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      {parcelData.data.deliveryAddress || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">
                      Tracking ID
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 font-mono">
                      {submittedTrackingId}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Status History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {parcelData.data.trackingEvents.map(
                    (log: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start p-4 border border-stone-200 dark:border-stone-700 rounded-lg"
                      >
                        <div className="flex-shrink-0 mr-4">
                          {getStatusIcon(log.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <span className="font-semibold text-stone-800 dark:text-stone-100">
                            {/*   {getStatusText(log.status)} */}
                            </span>
                            <span className="text-sm text-stone-500 dark:text-stone-400">
                              {log.timestamp
                                ? new Date(log.timestamp).toLocaleString()
                                : "Date not available"}
                            </span>
                          </div>

                          {log.updatedBy && (
                            <p className="text-sm text-stone-600 dark:text-stone-300 mb-2">
                              Updated by: {"Admin"}
                            </p>
                          )}

                          {log.note && (
                            <p className="text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 p-3 rounded-lg text-sm">
                              {log.note}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
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
