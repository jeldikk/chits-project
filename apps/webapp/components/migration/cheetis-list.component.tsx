import { list } from "aws-amplify/storage";

export default async function CheetisFilesList() {
  const response = await list({
    path: "migration/cheetis/",
    options: {
      pageSize: 20,
      bucket: "chits-storage",
    },
  });

  console.log({ cheetisResponse: response });
  return <div>Cheeti's files are rendered here</div>;
}
