import CheetiCard from "@/components/cheeti-lu/cheeti-card.component";
import { fetchCheetilu } from "@/services/cheetilu.service";
import Link from "next/link";

export default async function CheetiluPage() {
  const cheetilu = await fetchCheetilu();
  return (
    <div className="cheetilu-page px-2">
      <div className="page-header flex justify-between items-center mb-4">
        <h1 className="text-3xl">Your Cheeti's</h1>
        <Link
          href="/cheetilu/create"
          className="btn btn-outline btn-secondary btn-sm"
        >
          Create New
        </Link>
      </div>

      <div className="cheeti-list grid grid-cols-3 gap-4">
        {cheetilu.map((cheeti) => (
          <CheetiCard key={cheeti.id} cheeti={cheeti} />
        ))}
      </div>
    </div>
  );
}
