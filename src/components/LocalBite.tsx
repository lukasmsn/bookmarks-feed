"use client";

export interface LocalBiteType {
  id: string;
  pageContent: string;
  metadata: {
    parentTitle: string;
    parentAuthor: string;
    parentUrl: string;
    title: string;
  };
}

export interface LocalBiteProps {
  bite: LocalBiteType;
  showButtons: boolean;
  showTitles: boolean;
}

export default function LocalBite({ bite, showButtons, showTitles }: LocalBiteProps) {

  return (
    <div className="social-feed max-w-[640px]">
      <div
        className="bite-entry hover:bg-gray-100 rounded-none sm:rounded-2xl pt-2 pb-3 md:pt-3 md:pb-4 px-5 cursor-pointer"
      >
        <div className="space-y-0">
          {showTitles ? (
            <>
              <h2 className="md:text-lg font-semibold">
                {bite.metadata.title}
              </h2>
              <p className="flex-row space-x-1">
                <span className="author text-sm md:text-base text-gray-400 font-medium">
                  {bite.metadata.parentAuthor} •
                </span>
                <span className="title text-sm md:text-base text-gray-400 font-medium">
                  {bite.metadata.parentTitle}
                </span>
              </p>
            </>
          ) : (
            <p className="flex-col space-x-1">
              <span className="author text-sm md:text-base text-gray-700 font-bold">
                {bite.metadata.parentAuthor}
              </span>
              <span className="title text-sm md:text-base text-gray-400 font-medium">
                • {bite.metadata.parentTitle}
              </span>
            </p>
          )}
        </div>
        <p className="content text-sm md:text-base">{bite.pageContent}</p>
        {showButtons && (
          <div className="bite-buttons">
            <hr className="my-4 border-t border-gray-200" />
            <div className="flex justify-between mt-2">
              <div className="flex justify-start space-x-2">
                <div className="border-gray-200 border h-9 rounded-full px-3 flex items-center cursor-pointer">
                  <p className="text-gray-600">Like</p>
                </div>
                <div className="border-gray-200 border h-9 rounded-full px-3 flex items-center cursor-pointer">
                  <p className="text-gray-600">Ask</p>
                </div>
              </div>
              <div className="border-gray-200 border h-9 rounded-full px-3 flex items-center cursor-pointer">
                <p className="text-gray-600">Share</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
