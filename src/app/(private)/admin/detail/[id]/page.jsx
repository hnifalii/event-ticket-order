"use client";

import { eventOrganizers } from "@/data/eventOrganizers";
import { users } from "@/data/users";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams();

  const { data: session, status } = useSession();
  const router = useRouter();

  const organizers = eventOrganizers.filter((o) => o.eventId == params.id);

  const filteredUsers = organizers.map((o) =>
    users.find((u) => u.id == o.userId)
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
      router.refresh();
    } else {
      if (session !== undefined && session?.user.role !== "admin") {
        router.push("/auth");
        router.push();
      }
    }
  }, [router, session, status, session?.user.role]);

  return organizers != null ? (
    <div className="flex flex-col gap-5 px-6 py-6 md:px-24 md:py-8">
      <h1 className="text-3xl font-medium">List Organizer</h1>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iste.
      </p>

      {filteredUsers.length <= 0 ? (
        <div className="flex flex-col gap-3">
          <h1 className="font-medium">Daftar Panitia</h1>
          {filteredUsers.map((u) => {
            <div key={u.id} className="w-full py-3 px-4 rounded-md shadow-sm">
              <h1 className="font-semibold">{u.name}</h1>
            </div>;
          })}
        </div>
      ) : (
        <div className="mx-auto py-10">
          <h1 className="font-medium">Belum ada panitia terdaftar.</h1>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7209b7]"></div>
    </div>
  );
}
