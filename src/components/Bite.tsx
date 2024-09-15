export interface Bite {
  content: string;
  metadata: {
    parentTitle: string;
    parentAuthor: string;
    parentUrl: string;
    title: string;
  };
}

export default async function Bite({
  bite,
  showButtons,
}: {
  bite: Bite;
  showButtons: boolean;
}) {
  return (
    <div className="social-feed max-w-[640px]">
      <div className="bite-entry hover:bg-gray-100 rounded-none sm:rounded-2xl pt-2 pb-3 md:pt-3 md:pb-4 px-5 cursor-pointer">
        <div className="space-y-0">
          <h2 className="md:text-lg font-semibold">{bite.metadata.title}</h2>
          <p className="flex space-x-1">
            <span className="author text-sm md:text-base text-gray-400 font-medium">
              {bite.metadata.parentAuthor} •
            </span>
            <span className="title text-sm md:text-base text-gray-400 font-medium">
              {bite.metadata.parentTitle}
            </span>
          </p>
        </div>
        <p className="content mt-1 text-sm md:text-base">{bite.content}</p>
        {showButtons && (
          <div className="bite-buttons">
            <hr className="my-4 border-t border-gray-100" />
          <div className="flex justify-between mt-2">
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
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
}
