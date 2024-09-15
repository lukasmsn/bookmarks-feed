import { createClient } from "@/utils/supabase/server";
import Bite from "./Bite";

export default async function BitesNoTitle() {
  const supabase = createClient();
  const { data: bites } = await supabase.from("bites").select();

  console.log(bites);

  return (
    <div className="social-feed max-w-[640px]">
      {bites?.map((bite, index) => (
        <Bite bite={bite} key={index} showButtons={false} />
      ))}
    </div>
  );
}
