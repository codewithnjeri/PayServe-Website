"use client";

import { useState } from "react";
import { projectCategories } from "@/lib/site";
import { cx } from "./ui";
import { ProjectsCarousel } from "./sections";

export function ProjectsWithFilter() {
  const [filter, setFilter] = useState("All");
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by property type">
        {["All", ...projectCategories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cx(
              "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
              filter === c ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-ink hover:border-navy-800",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-2"><ProjectsCarousel key={filter} filter={filter} /></div>
    </div>
  );
}
