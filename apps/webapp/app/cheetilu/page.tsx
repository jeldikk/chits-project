import CheetiCard from "@/components/cheeti-lu/cheeti-card.component";
import { fetchCheetilu } from "@/services/cheetilu.service";
import { delay } from "@/utils/delay";
import Link from "next/link";

export default async function CheetiluPage() {
  const cheetilu = await fetchCheetilu();
  return (
    <div className="cheetilu-page px-2">
      <h1 className="text-3xl">Cheeti-lu you have created</h1>
      <Link href="/cheetilu/create" className="btn btn-primary">
        Create New
      </Link>
      <div className="cheeti-list grid grid-cols-3 gap-4">
        {cheetilu.map((cheeti) => (
          <CheetiCard key={cheeti.id} cheeti={cheeti} />
        ))}
      </div>
    </div>
  );
}
