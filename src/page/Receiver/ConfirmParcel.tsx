/* import { useConfirmParcelDeliveryMutation } from "@/redux/features/receiver/receiver.api";

export default function ConfirmParcel({ parcelId }: { parcelId: string }) {
  const [confirmParcelDelivery, {isLoading}] =
    useConfirmParcelDeliveryMutation();

  const handleConfirm = async () => {
    try {
      await confirmParcelDelivery(parcelId).unwrap();
      alert("Parcel confirmed!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleConfirm} disabled={isLoading}>
        {isLoading ? "Confirming..." : "Confirm Delivery"}
      </button>
    </div>
  );
}
 */


export default function ConfirmParcel() {
  return <div>ConfirmParcel</div>;
}
