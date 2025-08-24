import { baseApi } from "@/redux/baseApi";

export const SenderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            query: (parcelInfo) => ({
                url: "/parcel/create",
                method: "POST",
                data: parcelInfo,
            })
        }),
        getParcels: builder.query({
            query: () => ({
                url: "/parcel/me",
                method: "GET",
            })
        }),
        cancelParcel: builder.mutation({
            query: (id: string) => ({
                url: `parcel/cancel/${id}`,
                method: "PATCH",
            }),
        }),
    })
})

export const { useCreateParcelMutation, useGetParcelsQuery,useCancelParcelMutation } = SenderApi