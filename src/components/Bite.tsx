"use client";

import { useRouter } from "next/navigation";

export interface BiteType {
  id: string;
  content: string;
  metadata: {
    parentTitle: string;
    parentAuthor: string;
    parentUrl: string;
    title: string;
  };
}

export interface BiteProps {
  bite: BiteType;
  showButtons: boolean;
}

export default function Bite({ bite, showButtons }: BiteProps) {
  const router = useRouter();

  return (
    <div className="social-feed max-w-[640px]">
      <div
        onClick={() => router.push(`../bite/${bite.id}`)}
        className="bite-entry hover:bg-gray-100 rounded-none sm:rounded-2xl pt-2 pb-3 md:pt-3 md:pb-4 px-5 cursor-pointer"
      >
        <div className="space-y-0">
          <h2 className="md:text-lg font-semibold">{bite.metadata.title}</h2>
          <p className="flex-row space-x-1">
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
