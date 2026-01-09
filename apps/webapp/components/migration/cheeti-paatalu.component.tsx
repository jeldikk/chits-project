import { list } from "aws-amplify/storage";

export default async function CheetiPaataluFilesList() {
  const response = await list({
    path: "migartion/cheeti-paatas/",
    options: {
      pageSize: 20,
      bucket: "chits-storage",
    },
  });

  console.log({ cheetiPaatalu: response });
  return <div>Cheeti Paatalu list is rendered here</div>;
}
