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
            query: (id: string) => ({
                url: `/user/block-toggle/${id}`,
                method: "PATCH",
            }),
        }),
        updatedParcelStatus: builder.mutation({
            query: ({ id, newStatus, location, note }) => ({
                url: `/user/update-parcel-status/${id}`,
                method: "PATCH",
                body: { newStatus, location, note },
            }),
        }),
    })
})

export const { useAllUsersQuery, useManageUserMutation, useAllParcelsQuery, useUpdatedParcelStatusMutation } = AdminApi