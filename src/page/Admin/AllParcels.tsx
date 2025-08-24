import { useAllParcelsQuery } from "@/redux/features/admin/admin.api";

export default function AllParcels() {
  const { data } = useAllParcelsQuery(undefined);
  console.log(data);
  return <div>AllParcels</div>;
}
