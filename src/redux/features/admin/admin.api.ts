import { baseApi } from "@/redux/baseApi";

export const AdminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allUsers: builder.query({
            query: () => ({
                url: "/user/all-users",
                method: "GET",
            })
        }),
        allParcels: builder.query({
            query: () => ({
                url: "/user/all-parcels",
                method: "GET",
            })
        }),
        manageUser: builder.mutation({
            query: (id) => ({
                url: `/user/block-toggle/${id}`,
                method: "PATCH",
            }),
        }),
        trackingParcel: builder.query({
            query: (id) => ({
                url: `/user/tracking/${id}`,
                method: "GET",
            }),
        }),
        updatedParcelStatus: builder.mutation({
            query: ({ id, status, location, note }) => ({
                url: `/user/update-parcel-status/${id}`,
                method: "PATCH",
                data: { status, location, note },
            }),
        }),
    })
})

export const {
    useAllUsersQuery,
    useManageUserMutation,
    useAllParcelsQuery,
    useUpdatedParcelStatusMutation,
    useTrackingParcelQuery } = AdminApi