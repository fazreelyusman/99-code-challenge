import React, { useState } from "react";
import { FcPrevious } from "react-icons/fc";
import { GiPreviousButton } from "react-icons/gi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ImPrevious } from "react-icons/im";

interface Props {
  current: number;
  last: number;
  onPage: (p: number) => void;
  canJump?: boolean,
}

export default function Pagination({ current, last, onPage, canJump }: Props) {
  const [pageInput, setPageInput] = useState<number | "">("");
  const [showJump, setShowJump] = useState(false);

  const pages: number[] = [];
  const start = Math.max(1, current - 1);
  const end = Math.min(last, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  const defaultClass =
    "text-sm transition rounded-md px-3 py-1.5 text-text active:scale-95 ";
  const defaultClassActive = "bg-pagination-active font-semibold backdrop-blur-xl ";
  const defaultClassInactive = "bg-transparent hover:bg-pagination-hover ";

  const handleJump = () => {
    if (pageInput && pageInput >= 1 && pageInput <= last) {
      onPage(Number(pageInput));
      setShowJump(false); // hide after jumping
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-6 select-none">
      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={() => onPage(current - 1)}
          disabled={current <= 1}
          className={`${defaultClass} ${
            current <= 1
              ? "opacity-40 cursor-not-allowed"
              : defaultClassInactive
          }`}
        >
          <GrPrevious />
        </button>

        {/* First + Ellipsis */}
        {start > 1 && (
          <>
            <button
              onClick={() => onPage(1)}
              className={defaultClass + defaultClassInactive}
            >
              1
            </button>
            {start > 2 && <span className="text-gray-400">…</span>}
          </>
        )}

        {/* Middle pages */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={`${defaultClass} ${
              p === current ? defaultClassActive : defaultClassInactive
            }`}
          >
            {p}
          </button>
        ))}

        {/* Last + Ellipsis */}
        {end < last && (
          <>
            {end < last - 1 && <span className="text-gray-400">…</span>}
            <button
              onClick={() => onPage(last)}
              className={defaultClass + defaultClassInactive}
            >
              {last}
            </button>
          </>
        )}

        <button
          onClick={() => onPage(current + 1)}
          disabled={current >= last}
          className={`${defaultClass} ${
            current >= last
              ? "opacity-40 cursor-not-allowed"
              : defaultClassInactive
          }`}
        >
          <GrNext />
        </button>
      </div>

      {/* Jump to page (only visible when toggled) */}
      {canJump &&
        <div className="relative flex items-center justify-center text-xs text-text h-5">
          {/* Jump Button (shown first) */}
          <button
            onClick={() => setShowJump(true)}
            className={`absolute px-3 py-1 rounded-md bg-header hover:scale-105 transition-all duration-300 text-gray-200
            ${!showJump ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}
          >
            Jump
          </button>

          {/* Jump Input Section (shown after click) */}
          <div
            className={`absolute flex flex-nowrap items-center gap-2 whitespace-nowrap transition-all duration-300
            ${showJump ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"}`}
          >
            <span className="whitespace-nowrap">Jump to page:</span>
            <input
              type="number"
              min={1}
              max={last}
              value={pageInput}
              onChange={(e) =>
                setPageInput(e.target.value ? Number(e.target.value) : "")
              }
              onKeyDown={(e) => e.key === "Enter" && handleJump()}
              className="w-16 px-2 py-1 border border-border rounded-md bg-bg text-center
                focus:outline-none focus:ring-0
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
                [appearance:textfield]"
            />
            <button
              onClick={handleJump}
              className="px-3 py-1 rounded-md bg-pagination-active text-text font-semibold hover:scale-105 transition 
                disabled:cursor-not-allowed disabled:hover:scale-100 disabled:opacity-50
              "
              disabled={
                !pageInput ||
                Number(pageInput) < 1 ||
                Number(pageInput) > last
              }
            >
              Go
            </button>
          </div>
        </div>
      }
    </div>
  );
}
