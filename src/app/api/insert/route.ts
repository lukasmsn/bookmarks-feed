import { NextRequest, NextResponse } from "next/server";
// import { addDocumentsToStore } from "@/libs/langchain";
import { addBitesToStore } from "@/libs/langchain";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Data in insert route:", data);
  await addBitesToStore(data.bites);
  console.log("Added bites to store");
  return NextResponse.json({ message: "Successfully inserted document" });
}
