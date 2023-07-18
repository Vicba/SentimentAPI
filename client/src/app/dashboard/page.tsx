"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  })

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  return (
    <main className="h-screen flex items-start md:items-center justify-center overflow-x-hidden">
      <div className="mt-32 md:mt-0 mx-8 container flex flex-col items-center md:items-center justify-around lg:flex-row gap-20">
        <h1 className="text-white">Dashboard</h1>
      </div>
    </main>
  );
}
