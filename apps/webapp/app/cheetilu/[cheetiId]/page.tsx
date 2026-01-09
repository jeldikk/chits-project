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
  console.log({ cheeti, cheetiPaatalu });
  return (
    <div className="cheeti-details">
      <h1>Here we are going to render the details of {cheetiId} cheeti</h1>
    </div>
  );
}
