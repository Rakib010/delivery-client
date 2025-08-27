import { baseApi } from "@/redux/baseApi";

export const receiverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        incomingParcels: builder.query({
            query: () => ({
                url: "/parcel/incoming-parcels",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),
        deliveryHistory: builder.query({
            query: () => ({
                url: "/parcel/delivery-history",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),
        confirmParcelDelivery: builder.mutation({
            query: (id: string) => ({
                url: `/parcel/confirm-delivery/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["PARCEL"]
        }),
    })
})

export const { useIncomingParcelsQuery, useDeliveryHistoryQuery, useConfirmParcelDeliveryMutation } = receiverApi