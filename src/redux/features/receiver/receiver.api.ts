import { baseApi } from "@/redux/baseApi";

export const receiverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        incomingParcels: builder.query({
            query: () => ({
                url: "/parcel/incoming-parcels",
                method: "GET",
            })
        }),
        deliveryHistory: builder.query({
            query: () => ({
                url: "/parcel/delivery-history",
                method: "GET",
            })
        }),
        confirmParcelDelivery: builder.mutation({
            query: (id: string) => ({
                url: `parcel/cancel/${id}`,
                method: "PATCH",
            }),
        }),
    })
})

export const { useIncomingParcelsQuery, useDeliveryHistoryQuery, useConfirmParcelDeliveryMutation } = receiverApi