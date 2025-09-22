import { getUser } from "@/src/app/_lib/utils";

export default async function Page() {
  const user = await getUser();

  return (
    <div>
      Home
      <p>
        {user?.email}, {user?.id}
      </p>
    </div>
  );
}
