import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center">
      <h1>
        You are authenticated!
      </h1>

      <p>
        {JSON.stringify(session)}
      </p>
    </div>
  );
}
