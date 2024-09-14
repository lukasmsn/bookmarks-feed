import { NextRequest, NextResponse } from "next/server";
import { addDocumentsToStore, generateBites, addBitesToStore } from "@/libs/langchain";

export async function POST(req: NextRequest) {
  console.log("Inserting document");
  const { document } = await req.json();
  await addDocumentsToStore([document]);
  console.log("Successfully inserted document");

  const bites = await generateBites(document);
  console.log("Successfully generated bites");
  console.log(bites);

  const result = await addBitesToStore(bites);
  console.log("Successfully inserted document");
  return NextResponse.json(result);
}
