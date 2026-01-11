import { cookieBasedClient } from "@/utils/amplify.server";

type Props = {
  params: Promise<{ cheetiId: string }>;
};

export default async function CheetiDetailsPage(props: Props) {
  const { cheetiId } = await props.params;
  const { data: cheeti } = await cookieBasedClient.models.Cheeti.get({
    id: cheetiId,
  });
  const cheetiPaatalu = await cheeti?.cheetiPaatalu();
  return (
    <div className="cheeti-details px-2">
      <div className="card card-border text-primary-content border-rounded-lg">
        <div className="card-body">
          <div className="header flex justify-between items-center">
            <h2 className="card-title text-3xl">{cheeti?.name}</h2>
            <div className="badge badge-primary font-bold">
              {cheeti?.status}
            </div>
          </div>
          <p className="tags">
            <div className="badge badge-dash badge-info mx-1">
              {cheeti?.value} INR
            </div>
            <div className="badge badge-dash badge-info mx-1">
              {cheeti?.subscriptionAmount} INR
            </div>
            <div className="badge badge-dash badge-info mx-1">
              {cheeti?.memberCount} Members
            </div>
            <div className="badge badge-dash badge-info mx-1">
              {cheeti?.tenure} Months
            </div>
          </p>
          <div className="grid grid-cols-4 gap-4">
            <div className="date-details my-2">
              <p className="start-details">
                <span className="font-bold">Start Date: </span>
                {cheeti?.startDetails?.month}/{cheeti?.startDetails?.year}
              </p>
              <p className="end-details">
                <span className="font-bold">End Date: </span>
                {cheeti?.endDetails?.month}/{cheeti?.endDetails?.year}
              </p>
            </div>
            <div className="misc-details my-2">
              <p className="paata-date">
                <span className="font-bold">Paata Date: </span>
                {cheeti?.paataDate} of every month
              </p>
              <p className="manager-paata">
                <span className="font-bold">Manager Paata: </span>
                {cheeti?.managerPaata} of tenure
              </p>
            </div>
          </div>
          <div className="card-actions text-right flex justify-end-safe">
            <button className="btn btn-primary btn-sm">
              Add New Cheeti Paata
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
