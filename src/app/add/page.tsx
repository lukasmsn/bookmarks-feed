"use client";

import { useState } from "react";
// import AddButton from "@/components/addButton";
import Bite from "@/components/Bite";
import { BiteType } from "@/components/Bite";

export default function AddPage() {
  const [url, setUrl] = useState("");
  const [bites, setBites] = useState<BiteType[] | null>(null);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full space-y-2 mt-4">
        <div className="flex flex-row items-center justify-center max-w-[640px] space-x-2 w-full px-5">
          <input
            type="text"
            placeholder="Enter URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-300 rounded-full p-2 w-full h-9"
          />
          <button
            className="bg-gray-100 hover:bg-gray-200 text-black text-sm font-regular py-2 px-3 rounded-full"
            onClick={async () => {
              setBites(null);
              const response = await fetch("/api/generate-bites?type=url", {
                method: "POST",
                body: JSON.stringify({ url: url }),
              });
              const data = await response.json();
              setBites(data.bites);
              console.log("Bites:", bites);
            }}
          >
            Generate
          </button>
        </div>
      </div>
      {bites && (
        <div className="min-h-screen py-4 flex flex-col items-center">
          {bites?.map((bite: BiteType, index: number) => (
            <Bite
              bite={bite}
              key={index}
              showButtons={false}
              showTitles={true}
            />
          ))}
          <button
            className="bg-gray-100 hover:bg-gray-200 text-black text-sm font-regular py-2 px-3 rounded-full mt-4 mb-10"
            onClick={async () => {
              if (bites) {
                try {
                  const response = await fetch("/api/insert", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ bites: bites }),
                  });
                  if (!response.ok) {
                    throw new Error('Failed to add bites to database');
                  }
                  const result = await response.json();
                  console.log("Bites added to database:", result);
                  setBites(null);
                } catch (error) {
                  console.error("Error adding bites to database:", error);
                }
              }
            }}
          >
            Add bites to Database
          </button>
        </div>
      )}
    </>
  );
}
