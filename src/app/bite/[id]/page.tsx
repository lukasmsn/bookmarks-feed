"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BiteType } from "@/components/Bite";
import Bite from "@/components/Bite";

export default function BiteDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [bite, setBite] = useState<BiteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBite = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/bites?id=${id}`);
          const data = await response.json();
          console.log("Data:", data);
          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch bite");
          }
          setBite(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBite();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bite) return <div>No bite found.</div>;

  return (
    <div className="min-h-screen py-4">
      <main className="flex flex-col gap-8 items-center">
        <div className="flex w-full max-w-[640px] items-center justify-center gap-2 px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
          </svg>
          {/* <AddButton /> */}
        </div>
        <Bite bite={bite} showButtons={true} />
      </main>
    </div>
  );
}
