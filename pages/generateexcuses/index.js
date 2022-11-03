import Link from "next/link";
import React from "react";

const generateexcuses = () => {
  let excusesCategory = [
    "family",
    "office",
    "children",
    "party",
    "college",
    "funny",
    "unbelievable",
    "developers",
    "gaming",
  ];
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col gap-2">
        {excusesCategory.map((excuses, i) => {
          return (
            <Link key={i} href={`/generateexcuses/${excuses}`}>
              <a className="mx-1 text-xl hover:text-blue-700">{excuses}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default generateexcuses;
