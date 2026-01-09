import { list } from "aws-amplify/storage";
export default async function ManagersFilesList() {
  let nextToken;
  const response = await list({
    path: "migration/managers/",
    options: {
      pageSize: 20,
      bucket: "chits-storage",
    },
  });

  console.log({ response });

  return <div>Managers files list</div>;
}
