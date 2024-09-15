"use client";

// import documents from "@/data/documents.json";

export default function AddButton({ url }: { url: string }) {
//   const newArticle = documents[2];

  return (
    <button 
      className="bg-gray-100 hover:bg-gray-200 text-black text-sm font-regular py-2 px-3 rounded-full"
      onClick={() => {
        fetch("/api/insert?type=url", {
          method: "POST",
          body: JSON.stringify({ url: url }),
        });
      }}
    >
      Insert
    </button>
  );
}
