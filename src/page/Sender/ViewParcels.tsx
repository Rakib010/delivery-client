import { useState } from "react";
import { useGetParcelsQuery } from "@/redux/features/sender/sender.api";
import { Package, Calendar, Scale, CreditCard, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { handleLoadingError } from "@/utils/ErrorHandle";
import { getStatusIcon, getStatusVariant } from "@/utils/status";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function ViewParcels() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading, isError } = useGetParcelsQuery({
    page: currentPage,
    limit,
    search,
    status: statusFilter,
  });

  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  const totalPage = data?.meta?.totalPage ?? 1;

  return (
    <div className="container mx-auto px-4 font-mono">
      {/* Heading */}
      <div className="flex flex-col gap-2 mb-6 text-center">
        <p className="text-muted-foreground text-3xl my-4">Track All Parcels</p>
      </div>

      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 ">
        <input
          type="text"
          placeholder="Search parcels by the type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-orange-400 outline rounded-md px-3 py-2 w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Status Filter</option>
          <option value="approved">Approved</option>
          <option value="dispatched">Dispatched</option>
          <option value="inTransit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
                  <th className="p-4 text-left font-medium min-w-[200px]">
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
                      {parcel.receiver?.name ?? parcel.receiver}
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
                    <td className="p-4 flex items-center gap-1">
                      {getStatusIcon(parcel.status)}
                      <Badge variant={getStatusVariant(parcel.status)}>
                        {parcel.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {parcel.deliveryDate
                            ? new Date(parcel.deliveryDate).toLocaleDateString()
                            : "Not set"}
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

      {/* Pagination */}
      <div className="my-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                <PaginationLink isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPage))
                }
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
