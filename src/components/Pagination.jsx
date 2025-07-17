"use client";

import Link from "next/link";

export default function Pagination({ currentPage, total, limit }) {
  const maxPage = Math.ceil(total / limit);

  return (
    <div className="flex items-center justify-center space-x-12 pt-6">
      {currentPage > 1 ? (
        <Link href={`?page=${currentPage - 1}`}>
          <span
            className={
              "w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:text-black transition cursor-pointer text-xl hover:bg-gray-50 hover:shadow-md"
            }
          >
            {"<"}
          </span>
        </Link>
      ) : (
        <span className={"text-gray-400 cursor-not-allowed text-xl"}>
          {"<"}
        </span>
      )}

      <span className="text-gray-700 text-sm">
        {currentPage} / {maxPage}
      </span>

      {currentPage < maxPage ? (
        <Link href={`?page=${currentPage + 1}`}>
          <span
            className={
              "w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:text-black transition cursor-pointer text-xl hover:bg-gray-50 hover:shadow-md"
            }
          >
            {">"}
          </span>
        </Link>
      ) : (
        <span className={"text-gray-400 cursor-not-allowed text-xl"}>
          {">"}
        </span>
      )}
    </div>
  );
}
