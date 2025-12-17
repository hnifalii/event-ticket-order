import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-5 px-6 py-6 md:px-24 md:py-8">
      <h1 className="text-3xl font-semibold">Profil Saya</h1>
      <hr className="opacity-50" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">ID:</h2>
          <p>{session?.user.id}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Username:</h2>
          <p>@{session?.user.username}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Name:</h2>
          <p>{session?.user.name}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Role:</h2>
          <p>{session?.user.role}</p>
        </div>
      </div>
    </div>
  );
}
