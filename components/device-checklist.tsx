"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Priority = "Critical" | "Important" | "Recommended";

type ChecklistItem = {
  id: string;
  title: string;
  howTo: string;
  priority: Priority;
};

type Platform = "iphone" | "android" | "mac" | "windows";

const platformLabels: Record<Platform, string> = {
  iphone: "iPhone",
  android: "Android",
  mac: "Mac",
  windows: "Windows",
};

const checklists: Record<Platform, ChecklistItem[]> = {
  /* ---- iPhone ---- */
  iphone: [
    {
      id: "iphone-faceid",
      title: "Enable Face ID / Touch ID",
      howTo: "Settings > Face ID & Passcode",
      priority: "Critical",
    },
    {
      id: "iphone-passcode",
      title: "Set a 6-digit or alphanumeric passcode",
      howTo: "Settings > Face ID & Passcode",
      priority: "Critical",
    },
    {
      id: "iphone-findmy",
      title: "Enable Find My iPhone",
      howTo: "Settings > [Your Name] > Find My",
      priority: "Critical",
    },
    {
      id: "iphone-autoupdate",
      title: "Enable automatic updates",
      howTo: "Settings > General > Software Update > Automatic Updates",
      priority: "Critical",
    },
    {
      id: "iphone-permissions",
      title: "Review app permissions",
      howTo: "Settings > Privacy & Security",
      priority: "Important",
    },
    {
      id: "iphone-usb",
      title: "Disable USB accessories when locked",
      howTo: "Settings > Face ID & Passcode > USB Accessories off",
      priority: "Important",
    },
    {
      id: "iphone-lockdown",
      title: "Enable Lockdown Mode if high-risk",
      howTo: "Settings > Privacy & Security > Lockdown Mode",
      priority: "Important",
    },
    {
      id: "iphone-autolock",
      title: "Set auto-lock to 1 minute",
      howTo: "Settings > Display & Brightness > Auto-Lock",
      priority: "Important",
    },
    {
      id: "iphone-notifications",
      title: "Disable lock screen notifications preview",
      howTo: "Settings > Notifications > Show Previews > When Unlocked",
      priority: "Recommended",
    },
    {
      id: "iphone-location",
      title: "Review location services per app",
      howTo: "Settings > Privacy & Security > Location Services",
      priority: "Recommended",
    },
    {
      id: "iphone-adp",
      title: "Enable Advanced Data Protection for iCloud",
      howTo: "Settings > [Your Name] > iCloud > Advanced Data Protection",
      priority: "Recommended",
    },
    {
      id: "iphone-unused-apps",
      title: "Remove unused apps",
      howTo: "Long-press any app > Remove App, or Settings > General > iPhone Storage",
      priority: "Recommended",
    },
  ],

  /* ---- Android ---- */
  android: [
    {
      id: "android-screenlock",
      title: "Set a secure screen lock",
      howTo: "Settings > Security > Screen Lock",
      priority: "Critical",
    },
    {
      id: "android-playprotect",
      title: "Enable Google Play Protect",
      howTo: "Play Store > Menu > Play Protect",
      priority: "Critical",
    },
    {
      id: "android-findmy",
      title: "Enable Find My Device",
      howTo: "Settings > Security > Find My Device",
      priority: "Critical",
    },
    {
      id: "android-autoupdate",
      title: "Enable automatic system updates",
      howTo: "Settings > System > System Update",
      priority: "Critical",
    },
    {
      id: "android-permissions",
      title: "Review app permissions",
      howTo: "Settings > Apps > Permissions Manager",
      priority: "Important",
    },
    {
      id: "android-unknown",
      title: "Disable installation from unknown sources",
      howTo: "Settings > Security > Install unknown apps",
      priority: "Important",
    },
    {
      id: "android-encryption",
      title: "Enable encryption",
      howTo: "Settings > Security > Encryption",
      priority: "Important",
    },
    {
      id: "android-timeout",
      title: "Set auto-lock timeout",
      howTo: "Settings > Display > Screen Timeout",
      priority: "Important",
    },
    {
      id: "android-notifications",
      title: "Disable lock screen notifications",
      howTo: "Settings > Apps & Notifications > Notifications on lock screen",
      priority: "Recommended",
    },
    {
      id: "android-accounts",
      title: "Review connected accounts",
      howTo: "Settings > Accounts",
      priority: "Recommended",
    },
    {
      id: "android-bluetooth",
      title: "Disable Bluetooth and NFC when not in use",
      howTo: "Quick Settings panel or Settings > Connected Devices",
      priority: "Recommended",
    },
    {
      id: "android-unused",
      title: "Remove unused apps and review default apps",
      howTo: "Settings > Apps > See all apps, then uninstall or disable",
      priority: "Recommended",
    },
  ],

  /* ---- Mac ---- */
  mac: [
    {
      id: "mac-filevault",
      title: "Enable FileVault encryption",
      howTo: "System Settings > Privacy & Security > FileVault",
      priority: "Critical",
    },
    {
      id: "mac-password",
      title: "Set a strong login password",
      howTo: "System Settings > Users & Groups > Change Password",
      priority: "Critical",
    },
    {
      id: "mac-firewall",
      title: "Enable Firewall",
      howTo: "System Settings > Network > Firewall",
      priority: "Critical",
    },
    {
      id: "mac-autoupdate",
      title: "Enable automatic updates",
      howTo: "System Settings > General > Software Update",
      priority: "Critical",
    },
    {
      id: "mac-lockscreen",
      title: "Require password immediately after sleep",
      howTo: "System Settings > Lock Screen",
      priority: "Important",
    },
    {
      id: "mac-autologin",
      title: "Disable automatic login",
      howTo: "System Settings > Users & Groups",
      priority: "Important",
    },
    {
      id: "mac-privacy",
      title: "Review Privacy permissions",
      howTo: "System Settings > Privacy & Security",
      priority: "Important",
    },
    {
      id: "mac-findmy",
      title: "Enable Find My Mac",
      howTo: "System Settings > [Your Name] > iCloud > Find My Mac",
      priority: "Important",
    },
    {
      id: "mac-sharing",
      title: "Disable remote login/management if not needed",
      howTo: "System Settings > General > Sharing",
      priority: "Recommended",
    },
    {
      id: "mac-extensions",
      title: "Review browser extensions and remove unused ones",
      howTo: "Open browser > Extensions/Add-ons settings",
      priority: "Recommended",
    },
    {
      id: "mac-lockdown",
      title: "Enable Lockdown Mode if high-risk",
      howTo: "System Settings > Privacy & Security > Lockdown Mode",
      priority: "Recommended",
    },
    {
      id: "mac-firmware",
      title: "Set up a firmware password (Intel) or review Activation Lock (Apple Silicon)",
      howTo: "Recovery Mode for Intel; System Settings > [Your Name] for Apple Silicon",
      priority: "Recommended",
    },
  ],

  /* ---- Windows ---- */
  windows: [
    {
      id: "win-bitlocker",
      title: "Enable BitLocker or Device Encryption",
      howTo: "Settings > Privacy & Security > Device Encryption",
      priority: "Critical",
    },
    {
      id: "win-pin",
      title: "Set a strong PIN or password",
      howTo: "Settings > Accounts > Sign-in Options",
      priority: "Critical",
    },
    {
      id: "win-hello",
      title: "Enable Windows Hello (biometrics) if available",
      howTo: "Settings > Accounts > Sign-in Options > Windows Hello",
      priority: "Critical",
    },
    {
      id: "win-autoupdate",
      title: "Enable automatic updates",
      howTo: "Settings > Windows Update",
      priority: "Critical",
    },
    {
      id: "win-defender",
      title: "Enable Windows Defender / Firewall",
      howTo: "Settings > Privacy & Security > Windows Security",
      priority: "Important",
    },
    {
      id: "win-rdp",
      title: "Disable Remote Desktop if not needed",
      howTo: "Settings > System > Remote Desktop",
      priority: "Important",
    },
    {
      id: "win-permissions",
      title: "Review app permissions",
      howTo: "Settings > Privacy & Security",
      priority: "Important",
    },
    {
      id: "win-findmy",
      title: "Enable Find My Device",
      howTo: "Settings > Privacy & Security > Find My Device",
      priority: "Important",
    },
    {
      id: "win-startup",
      title: "Review startup apps and disable unnecessary ones",
      howTo: "Task Manager > Startup",
      priority: "Recommended",
    },
    {
      id: "win-autorun",
      title: "Disable USB autorun",
      howTo: "Group Policy or Registry: set NoDriveTypeAutoRun",
      priority: "Recommended",
    },
    {
      id: "win-extensions",
      title: "Review browser extensions",
      howTo: "Open browser > Extensions/Add-ons settings",
      priority: "Recommended",
    },
    {
      id: "win-unused",
      title: "Remove unused software",
      howTo: "Settings > Apps > Installed Apps, then uninstall",
      priority: "Recommended",
    },
  ],
};

const priorities: Priority[] = ["Critical", "Important", "Recommended"];

const priorityMeta: Record<Priority, { label: string; accent: string; badge: string }> = {
  Critical: {
    label: "Critical",
    accent: "border-warning/30 bg-warning/6",
    badge: "bg-warning/14 text-warning",
  },
  Important: {
    label: "Important",
    accent: "border-accent/20 bg-accent/5",
    badge: "bg-accent/10 text-accent",
  },
  Recommended: {
    label: "Recommended",
    accent: "border-line bg-card/50",
    badge: "bg-card text-muted",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function storageKey(platform: Platform) {
  return `fk94-device-${platform}`;
}

function loadChecked(platform: Platform): string[] {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(storageKey(platform));
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string")
      : [];
  } catch {
    window.localStorage.removeItem(storageKey(platform));
    return [];
  }
}

export function DeviceChecklist() {
  const [platform, setPlatform] = useState<Platform>("iphone");
  const [checked, setChecked] = useState<Record<Platform, string[]>>({
    iphone: [],
    android: [],
    mac: [],
    windows: [],
  });
  const [hydrated, setHydrated] = useState(false);

  /* hydrate from localStorage once */
  useEffect(() => {
    setChecked({
      iphone: loadChecked("iphone"),
      android: loadChecked("android"),
      mac: loadChecked("mac"),
      windows: loadChecked("windows"),
    });
    setHydrated(true);
  }, []);

  /* persist whenever checked changes (after hydration) */
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey(platform), JSON.stringify(checked[platform]));
  }, [checked, platform, hydrated]);

  const items = checklists[platform];
  const total = items.length;
  const completed = checked[platform].length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const current = prev[platform];
      const next = current.includes(id)
        ? current.filter((v) => v !== id)
        : [...current, id];
      return { ...prev, [platform]: next };
    });
  };

  const grouped = priorities
    .map((p) => ({
      priority: p,
      items: items.filter((i) => i.priority === p),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      {/* ---- Header panel ---- */}
      <section className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Progress
            </p>
            <h3 className="mt-3 text-2xl font-bold text-ink">
              {platformLabels[platform]} hardening
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Work through {platformLabels[platform]}-specific security settings
              at your own pace. Progress is saved locally in this browser for
              each platform.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-card/80 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">Completion</p>
            <p className="mt-2 text-4xl font-bold text-ink">
              {completed}
              <span className="text-xl text-muted">/{total}</span>
            </p>
          </div>
        </div>

        {/* progress bar */}
        <div className="mt-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-muted">{pct}% complete</p>
        </div>

        {/* platform tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(platformLabels) as Platform[]).map((key) => {
            const active = platform === key;
            const platformDone = checked[key].length;
            const platformTotal = checklists[key].length;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPlatform(key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-accent text-black"
                    : "border border-line bg-card/80 text-ink hover:border-accent/30",
                )}
              >
                {platformLabels[key]}
                {hydrated && (
                  <span className={cn("ml-2 text-xs", active ? "text-black/60" : "text-muted")}>
                    {platformDone}/{platformTotal}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ---- Priority groups ---- */}
      {grouped.map((group) => {
        const meta = priorityMeta[group.priority];
        return (
          <section
            key={group.priority}
            className="rounded-xl border border-line bg-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
                  meta.badge,
                )}
              >
                {meta.label}
              </span>
              <span className="text-sm text-muted">
                {group.items.filter((i) => checked[platform].includes(i.id)).length}/
                {group.items.length} done
              </span>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {group.items.map((item) => {
                const isDone = checked[platform].includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    className={cn(
                      "rounded-xl border p-5 text-left transition",
                      isDone
                        ? "border-accent/30 bg-accent/10 text-ink shadow-[0_8px_30px_rgba(16,185,129,0.06)]"
                        : cn("hover:border-accent/30", meta.accent),
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* checkbox indicator */}
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs transition",
                          isDone
                            ? "border-accent/30 bg-accent/20 text-accent"
                            : "border-line bg-card text-transparent",
                        )}
                      >
                        {isDone ? "\u2713" : ""}
                      </span>

                      <div className="min-w-0">
                        <h5 className="text-sm font-semibold leading-snug">{item.title}</h5>
                        <p
                          className={cn(
                            "mt-1.5 text-xs leading-5",
                            isDone ? "text-muted" : "text-muted",
                          )}
                        >
                          {item.howTo}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
