"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
      router.refresh();
    } else {
      if (session !== undefined && session?.user.role !== "admin") {
        router.push("/auth");
        router.refresh();
      }
    }
  }, [router, session, status, session?.user.role]);

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
