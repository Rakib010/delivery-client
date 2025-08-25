/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const handleLoadingError = (
  isLoading: any,
  isError: any,
  customMessage = null
) => {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin h-12 w-12 text-amber-600" />
        
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4 p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription>
            {customMessage || "Failed to load parcel data. Please try again."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return null;
};
