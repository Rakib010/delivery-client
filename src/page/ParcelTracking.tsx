import { useState } from "react";
import {
  Search,
  Package,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  AlertCircle,
} from "react-feather";

export default function ParcelTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [parcelData, setParcelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock API function - replace with actual API call
  const trackParcel = async (id) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with actual API response
      const mockData = {
        trackingId: id,
        status: "in_transit",
        recipient: "John Doe",
        destination: "123 Main St, Dhaka 1212",
        estimatedDelivery: "2023-12-20T14:00:00Z",
        statusHistory: [
          {
            status: "dispatched",
            timestamp: "2023-12-18T10:30:00Z",
            updatedBy: "System",
            note: "Package has been dispatched from warehouse",
          },
          {
            status: "in_transit",
            timestamp: "2023-12-18T14:45:00Z",
            updatedBy: "Driver ID: D-456",
            note: "Package is in transit to destination",
          },
          {
            status: "processing",
            timestamp: "2023-12-17T09:15:00Z",
            updatedBy: "Admin User",
            note: "Package received and processing",
          },
        ],
      };

      setParcelData(mockData);
    } catch (err) {
      setError("Parcel not found. Please check your tracking ID.");
      setParcelData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      trackParcel(trackingId.trim());
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-500" size={20} />;
      case "in_transit":
        return <Truck className="text-blue-500" size={20} />;
      case "processing":
        return <Package className="text-amber-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "in_transit":
        return "In Transit";
      case "processing":
        return "Processing";
      case "dispatched":
        return "Dispatched";
      default:
        return status;
    }
  };

  return (
    <section className="py-12 bg-stone-50 dark:bg-stone-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="text-stone-400" size={20} />
              </div>
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID (e.g., PKG-123456)"
                className="w-full pl-10 pr-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-stone-800 dark:text-white"
                required
              />
            </div>
            <button
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
            </button>
          </form>
        </div>

        {/* Results */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {parcelData && (
          <div className="max-w-4xl mx-auto">
            {/* Package Summary */}
            <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">
                    Package Details
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400">
                    Tracking ID:{" "}
                    <span className="font-mono">{parcelData.trackingId}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(parcelData.status)}
                  <span className="text-lg font-semibold">
                    {getStatusText(parcelData.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start">
                  <MapPin className="text-amber-600 mt-1 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100">
                      Destination
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      {parcelData.destination}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-amber-600 mt-1 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100">
                      Estimated Delivery
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      {new Date(
                        parcelData.estimatedDelivery
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-6">
                Delivery Status History
              </h2>

              <div className="space-y-4">
                {parcelData.statusHistory.map((event, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      {index < parcelData.statusHistory.length - 1 && (
                        <div className="w-0.5 h-16 bg-stone-300 dark:bg-stone-600 my-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(event.status)}
                        <span className="font-semibold text-stone-800 dark:text-stone-100">
                          {getStatusText(event.status)}
                        </span>
                      </div>
                      <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                      <p className="text-sm text-stone-600 dark:text-stone-300 mb-1">
                        Updated by: {event.updatedBy}
                      </p>
                      <p className="text-stone-700 dark:text-stone-200">
                        {event.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
