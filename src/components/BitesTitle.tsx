import { createClient } from '@/utils/supabase/server';

export default async function Bites() {
  const supabase = createClient();
  const { data: bites } = await supabase.from("bites").select();

  return (
    <div className="social-feed max-w-[640px]">
    {bites?.map((bite, index) => (
      <div key={index} className="bite-entry hover:bg-gray-100 rounded-none sm:rounded-2xl pt-2 pb-3 md:pt-3 md:pb-4 px-5 cursor-pointer">
        <div className="space-y-0">
          <h2 className="md:text-lg font-semibold">{bite.metadata.title}</h2>
          <p className="flex-col space-x-1">
            <span className="author text-sm md:text-base text-gray-400 font-medium">
              {bite.metadata.parentAuthor} •
            </span>
            <span className="title text-sm md:text-base text-gray-400 font-medium">
              {bite.metadata.parentTitle}
            </span>
          </p>
        </div>
        <p className="content mt-1 text-sm md:text-base">{bite.content}</p>
        {/* <div className="flex justify-between mt-2">
          <div className="flex justify-start space-x-2">
            <div className="bg-gray-100 h-9 rounded-full px-3 flex items-center cursor-pointer">
              <p className="text-gray-600">Like</p>
            </div>
            <div className="bg-gray-100 h-9 rounded-full px-3 flex items-center cursor-pointer">
              <p className="text-gray-600">Ask</p>
            </div>
          </div>
          <div className="bg-gray-100 h-9 rounded-full px-3 flex items-center cursor-pointer">
              <p className="text-gray-600">Share</p>
            </div>
        </div> */}
        {/* <hr className="my-4 border-t border-gray-100" /> */}
      </div>
    ))}
  </div>
  )
}