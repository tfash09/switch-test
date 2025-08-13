import React, { useState } from "react";
import AccountCard from "./AccountCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { AccountCarouselProps } from "@/lib/interfaces";

const AccountCarousel: React.FC<AccountCarouselProps> = ({ accounts }) => {
  const [startIdx, setStartIdx] = useState(0);
  const maxVisible = 3;

  const canGoLeft = startIdx > 0;
  const canGoRight = startIdx + maxVisible < accounts.length;

  return (
    <div className="flex items-center gap-1 w-full overflow-hidden">
      {canGoLeft && (
        <button
          className="p-1 rounded-full bg-primary text-white hover:bg-secondary shrink-0 ml-0"
          onClick={() => setStartIdx(startIdx - 1)}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}
      <div
        className="flex gap-4 w-full"
        style={{
          overflow: "hidden",
        }}
      >
        {accounts
          .slice(
            startIdx,
            window.innerWidth < 640
              ? startIdx + 1
              : Math.min(startIdx + maxVisible, accounts.length)
          )
          .map((acc, idx) => (
            <div
              key={idx}
              className={`w-full ${
                window.innerWidth < 640 ? "min-w-0" : ""
              }`}
              style={{
                flex: window.innerWidth < 640 ? "0 0 100%" : "1 1 0",
              }}
            >
              <AccountCard {...acc} />
            </div>
          ))}
      </div>
      {canGoRight && (
        <button
          className="p-1 rounded-full bg-primary text-white hover:bg-secondary shrink-0 mr-0"
          onClick={() => setStartIdx(startIdx + 1)}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default AccountCarousel;