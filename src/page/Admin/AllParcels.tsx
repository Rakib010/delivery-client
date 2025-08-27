/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useAllParcelsQuery,
  useUpdatedParcelStatusMutation,
} from "@/redux/features/admin/admin.api";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { handleLoadingError } from "@/utils/ErrorHandle";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Calendar, User } from "lucide-react";
import { getStatusIcon, getStatusVariant } from "@/utils/status";

export default function AllParcels() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setlimt] = useState(5);

  const {
    data: parcelData,
    isLoading,
    isError,
  } = useAllParcelsQuery({
    page: currentPage,
    limit,
  });

  const [updateStatus] = useUpdatedParcelStatusMutation();

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await updateStatus({
        id,
        status: newStatus,
        location: "On the way",
        note: "Admin updated status",
      }).unwrap();
      if (res.success) {
        toast.success(`Parcel status updated to ${newStatus}`);
      }
    } catch (err) {
      // console.error("Failed to update status:", err);
      toast.error("Failed to update parcel status");
    }
  };

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  const parcels = parcelData?.data?.parcels;
  const totalPage = parcelData?.meta?.totalPage || 1;

  return (
    <div className="container mx-auto p-6 font-mono">
      <div className="mb-8">
        <p className="text-3xl font-bold text-center text-gray-600 dark:text-gray-400">
          View and manage all parcels in the system
        </p>
      </div>

      {parcels?.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No parcels found
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 font-bold">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Delivery Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {parcels?.map((parcel: any) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {parcel.type}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            SenderID: {parcel._id?.substring(0, 8)}...
                          </div>
                          {parcel.productName && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Product: {parcel.productName}
                            </div>
                          )}
                          {parcel.weight && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Weight: {parcel.weight} kg
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          {parcel.deliveryAddress || "No address provided"}
                        </div>
                        {parcel.receiver && (
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <User className="h-4 w-4" />
                            ReceiverID: {parcel.receiver?.substring(0, 8)}...
                          </div>
                        )}
                        {parcel.createdAt && (
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(parcel.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 flex items-center gap-1">
                      {getStatusIcon(parcel.status)}
                      <Badge
                        variant={getStatusVariant(parcel.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {parcel.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Select
                        onValueChange={(value) =>
                          handleStatusChange(parcel._id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status Options</SelectLabel>
                            <SelectItem value="approved">APPROVED</SelectItem>
                            <SelectItem value="dispatched">
                              DISPATCHED
                            </SelectItem>
                            <SelectItem value="inTransit">
                              IN_TRANSIT
                            </SelectItem>
                            <SelectItem value="delivered">DELIVERED</SelectItem>
                            <SelectItem value="cancelled">CANCELLED</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* pagination */}
      <div className="my-12 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPage }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={
                  currentPage === totalPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
