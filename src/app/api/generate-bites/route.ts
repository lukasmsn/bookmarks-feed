import { NextRequest, NextResponse } from "next/server";
import { generateBites, generateBitesFromWeb } from "@/libs/langchain";
import { Bite } from "@/libs/langchain";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const data = await req.json();

  let result: Bite[];

  if (type === "document") {
    result = await generateBites(data.document);
    console.log("Generated bites from document");
  } else if (type === "url") {
    result = await generateBitesFromWeb(data.url);
    console.log("Generated bites from URL");
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  return NextResponse.json({ bites: result });
}
