import { auth, signOut } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  console.log(session);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>
        You are authenticated!
      </h1>

      <div>
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <button type="submit">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
