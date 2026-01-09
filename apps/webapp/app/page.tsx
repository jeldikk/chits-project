import { delay } from "@/utils/delay";

export default async function Home() {
  await delay(5000);
  return (
    <div className="flex min-h-screen items-center justify-center">
      Home Page is here
    </div>
  );
}
