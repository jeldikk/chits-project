import TabsFilesListComponent from "@/components/migration/tabs-files-list.component";
import { delay } from "@/utils/delay";
import Link from "next/link";

export default async function MigrationPage() {
  await delay(9000);
  return (
    <div className="min-h-screen">
      <div className="flex w-full flex-row justify-between">
        <h1 className="text-2xl">Migrated Documents</h1>
        <button type="button" className="btn btn-primary mx-3">
          <Link href="/migration/add-new">Add New</Link>
        </button>
      </div>
      <TabsFilesListComponent />
    </div>
  );
}
