import { Schema } from "@/data-schema";
import Link from "next/link";

type Props = {
  cheeti: Schema["Cheeti"]["type"];
};
export default function CheetiCard(props: Props) {
  const { cheeti } = props;
  return (
    <div className="cheeti-card card bg-base-300 card-xs shadow p-2">
      <div className="card-body">
        <h2 className="card-title">{cheeti.name}</h2>
        <p>{cheeti.value}</p>
        <div className="justify-end card-actions">
          <Link href={`/cheetilu/${cheeti.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
