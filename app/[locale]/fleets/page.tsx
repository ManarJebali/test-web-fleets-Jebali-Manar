import { CreateFleetModal } from "@/components/fleets/create-fleet-modal";
import { FleetsList } from "@/components/fleets/fleets-list";

export default function FleetsPage() {
  return (
    <>
      <FleetsList />
      <CreateFleetModal />
    </>
  );
}
