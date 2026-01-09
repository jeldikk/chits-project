import ManagerDrawerForm from "@/components/managers/manager-drawer-form.component";
import ManagersList from "@/components/managers/managers-list.component";
import { fetchManagers } from "@/services/managers.service";
import Link from "next/link";

export default async function ManagersPage() {
  const managers = await fetchManagers();
  return (
    <div className="manager-page">
      <div className="flex flex-row items-center justify-between p-4">
        <h1 className="text-2xl">Your Managers</h1>
        <ManagerDrawerForm />
      </div>
      <ManagersList />
    </div>
  );
}
