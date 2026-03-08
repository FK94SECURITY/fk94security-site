"use client";

import { useDeferredValue, useEffect, useState } from "react";

import { checklistGroups } from "@/content/tools";

const storageKey = "fk94-opsec-checklist-progress";

export function ChecklistLab() {
  const [query, setQuery] = useState("");
  const [done, setDone] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      window.localStorage.removeItem(storageKey);
      return [];
    }
  });
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(done));
  }, [done]);

  const filteredGroups = checklistGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const haystack = `${group.title} ${item.title} ${item.detail}`.toLowerCase();
        return haystack.includes(deferredQuery.trim().toLowerCase());
      }),
    }))
    .filter((group) => group.items.length > 0);

  const total = checklistGroups.reduce((sum, group) => sum + group.items.length, 0);
  const completed = done.length;

  const toggle = (itemId: string) => {
    setDone((current) =>
      current.includes(itemId) ? current.filter((entry) => entry !== itemId) : [...current, itemId],
    );
  };

  return (
    <div className="space-y-6">
      <section className="panel rounded-[2rem] border border-line p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-brand">Progress</p>
            <h3 className="mt-3 font-display text-2xl text-ink">OPSEC checklist</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Work through the basics at your own pace. Progress is saved locally in this browser,
              so you can come back without creating an account.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-line bg-white/70 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">Completion</p>
            <p className="mt-2 font-display text-4xl text-ink">
              {completed}
              <span className="text-xl text-muted">/{total}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search recovery, Gmail, devices, crypto, public exposure..."
            className="w-full rounded-full border border-line bg-sand px-5 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-ink/40 lg:max-w-lg"
          />
          <p className="text-sm text-muted">
            Search stays responsive while you work through the list.
          </p>
        </div>
      </section>

      {filteredGroups.map((group) => (
        <section key={group.title} className="panel rounded-[2rem] border border-line p-6 sm:p-8">
          <div className="max-w-2xl">
            <h4 className="font-display text-2xl text-ink">{group.title}</h4>
            <p className="mt-3 text-sm leading-7 text-muted">{group.description}</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {group.items.map((item) => {
              const checked = done.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    checked
                      ? "border-ink bg-ink text-sand shadow-[0_18px_40px_rgba(18,25,33,0.16)]"
                      : "border-line bg-white/72 text-ink hover:border-ink/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="text-base font-semibold">{item.title}</h5>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                        checked ? "bg-signal text-ink" : "border border-line bg-panel text-muted"
                      }`}
                    >
                      {checked ? "Done" : "Open"}
                    </span>
                  </div>
                  <p className={`mt-3 text-sm leading-6 ${checked ? "text-sand/74" : "text-muted"}`}>
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
