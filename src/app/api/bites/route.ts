import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const filters: Record<string, unknown> = {};

  const id = searchParams.get("id");
  if (id) {
    const { data, error } = await supabase
      .from("bites")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  }
  const threadId = searchParams.get("threadId");
  if (threadId) {
    const { data, error } = await supabase
      .from("bites")
      .select()
      .eq("metadata->threadId->>value", threadId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.log(data);
    return NextResponse.json(data);
  }

  const { data, error } = await supabase.from("bites").select().match(filters);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Shuffle the data array
  const shuffledData = data.sort(() => Math.random() - 0.5);

  return NextResponse.json(shuffledData);
}
