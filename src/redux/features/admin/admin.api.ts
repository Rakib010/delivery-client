import { baseApi } from "@/redux/baseApi";

export const AdminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allUsers: builder.query({
            query: () => ({
                url: "/user/all-users",
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        allParcels: builder.query({
            query: (params) => ({
                url: "/user/all-parcels",
                method: "GET",
                params
            }),
            providesTags: ["PARCEL"]
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
            providesTags: ["PARCEL"]
        }),
        updatedParcelStatus: builder.mutation({
            query: ({ id, status, location, note }) => ({
                url: `/user/update-parcel-status/${id}`,
                method: "PATCH",
                data: { status, location, note },
            }),
            invalidatesTags: ["PARCEL"]
        }),
        statsParcels: builder.query({
            query: () => ({
                url: "/stats/overViewParcel",
                method: "GET",
            }),
            providesTags: ["PARCEL"]
        }),

    })
})

export const {
    useAllUsersQuery,
    useManageUserMutation,
    useAllParcelsQuery,
    useUpdatedParcelStatusMutation,
    useTrackingParcelQuery,
    useStatsParcelsQuery
} = AdminApi