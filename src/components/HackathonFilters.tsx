"use client";

import { useState } from "react";

export type LocationFilter = "online" | "in-person";
export type StatusFilter = "upcoming" | "open" | "ended";
export type LengthFilter = "1-6 days" | "1-4 weeks" | "1+ month";

export interface FilterState {
  location: LocationFilter[];
  status: StatusFilter[];
  length: LengthFilter[];
  tags: string[];
}

const LOCATION_OPTIONS: { value: LocationFilter; label: string }[] = [
  { value: "online", label: "Online" },
  { value: "in-person", label: "In-person" },
];

const STATUS_OPTIONS: {
  value: StatusFilter;
  label: string;
  color: string;
}[] = [
  { value: "upcoming", label: "Upcoming", color: "bg-orange-500" },
  { value: "open", label: "Open", color: "bg-violet-500" },
  { value: "ended", label: "Ended", color: "bg-zinc-400" },
];

const LENGTH_OPTIONS: { value: LengthFilter; label: string }[] = [
  { value: "1-6 days", label: "1-6 days" },
  { value: "1-4 weeks", label: "1-4 weeks" },
  { value: "1+ month", label: "1+ month" },
];

// Tech categories only (no universities or orgs)
const INTEREST_TAGS = [
  "Beginner Friendly",
  "Machine Learning/AI",
  "Web",
  "Mobile",
  "Blockchain",
  "IoT",
  "Cybersecurity",
  "Open Source",
  "Social Good",
  "Open Ended",
  "Coding",
  "Innovation",
];

const ORG_TAGS_TO_EXCLUDE = [
  "IEEE",
  "NIBM",
  "SLIIT",
  "UOM",
  "USJ",
  "KDU",
];

interface HackathonFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  allTags: string[];
}

function toggleArray<T>(arr: T[], value: T): T[] {
  if (arr.includes(value)) return arr.filter((v) => v !== value);
  return [...arr, value];
}

export function HackathonFilters({
  filters,
  onChange,
  allTags,
}: HackathonFiltersProps) {
  const [showAllTags, setShowAllTags] = useState(false);
  const filteredAllTags = allTags.filter(
    (tag) => !ORG_TAGS_TO_EXCLUDE.includes(tag)
  );
  const displayTags = [
    ...new Set([...INTEREST_TAGS, ...filteredAllTags]),
  ].sort();
  const visibleTags = showAllTags
    ? displayTags
    : displayTags.slice(0, 5);
  const remainingCount = displayTags.length - visibleTags.length;

  const handleLocation = (v: LocationFilter) => {
    onChange({
      ...filters,
      location: toggleArray(filters.location, v),
    });
  };

  const handleStatus = (v: StatusFilter) => {
    onChange({
      ...filters,
      status: toggleArray(filters.status, v),
    });
  };

  const handleLength = (v: LengthFilter) => {
    onChange({
      ...filters,
      length: toggleArray(filters.length, v),
    });
  };

  const handleTag = (tag: string) => {
    onChange({
      ...filters,
      tags: toggleArray(filters.tags, tag),
    });
  };

  return (
    <aside className="w-64 shrink-0 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Location</h3>
        <ul className="mt-2 space-y-2">
          {LOCATION_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]"
            >
              <input
                type="checkbox"
                checked={filters.location.includes(opt.value)}
                onChange={() => handleLocation(opt.value)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              {opt.label}
            </label>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Status</h3>
        <ul className="mt-2 space-y-2">
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]"
            >
              <input
                type="checkbox"
                checked={filters.status.includes(opt.value)}
                onChange={() => handleStatus(opt.value)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${opt.color}`}
                aria-hidden
              />
              {opt.label}
            </label>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Length</h3>
        <ul className="mt-2 space-y-2">
          {LENGTH_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]"
            >
              <input
                type="checkbox"
                checked={filters.length.includes(opt.value)}
                onChange={() => handleLength(opt.value)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              {opt.label}
            </label>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Interest tags</h3>
        <ul className="mt-2 space-y-2">
          {visibleTags.map((tag) => (
            <label
              key={tag}
              className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]"
            >
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => handleTag(tag)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              {tag}
            </label>
          ))}
        </ul>
        {remainingCount > 0 && !showAllTags && (
          <button
            type="button"
            onClick={() => setShowAllTags(true)}
            className="mt-2 text-sm text-[var(--accent)] hover:underline"
          >
            Show more ({remainingCount})
          </button>
        )}
      </div>
    </aside>
  );
}
