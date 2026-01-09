import { Schema } from "@/data-schema";

interface Props {
  data: Schema["Manager"]["type"];
}

export default function ManagerCard(props: Props) {
  const { data } = props;
  return (
    <div className="card bg-base-300 card-xs shadow-sm p-2">
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <p>{data.address}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary btn-sm">View Details</button>
        </div>
      </div>
    </div>
  );
}
