import { baseApi } from "@/redux/baseApi";

export const SenderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            query: (parcelInfo) => ({
                url: "/parcel/create",
                method: "POST",
                data: parcelInfo,
            }),
            invalidatesTags: ["PARCEL"]
        }),
        getParcels: builder.query({
            query: (params) => ({
                url: "/parcel/me",
                method: "GET",
                params
            }),
            providesTags: ["PARCEL"],
        }),
        cancelParcel: builder.mutation({
            query: (id: string) => ({
                url: `parcel/cancel/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["PARCEL"]
        }),
    })
})

export const { useCreateParcelMutation, useGetParcelsQuery, useCancelParcelMutation } = SenderApi