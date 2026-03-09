"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type OS = "macos" | "windows";
type Profile = "standard" | "privacy" | "executive" | "crypto" | "journalist";
type Category = "system" | "network" | "privacy" | "encryption" | "browser" | "advanced";

interface HardeningStep {
  id: string;
  title: string;
  description: string;
  category: Category;
  risk: "low" | "medium" | "high";
  profiles: Profile[];
  macos?: { command: string; undo?: string };
  windows?: { command: string; undo?: string };
}

/* ------------------------------------------------------------------ */
/*  Profile definitions                                                */
/* ------------------------------------------------------------------ */

const profiles: Record<Profile, { label: string; emoji: string; description: string }> = {
  standard: {
    label: "Standard User",
    emoji: "\u{1F6E1}\u{FE0F}",
    description: "Everyday protection — strong defaults without breaking anything",
  },
  privacy: {
    label: "Privacy Focused",
    emoji: "\u{1F441}\u{FE0F}",
    description: "Minimize telemetry, tracking, and data collection",
  },
  executive: {
    label: "Executive / HNW",
    emoji: "\u{1F454}",
    description: "High-value target protection — corporate espionage, spearphishing",
  },
  crypto: {
    label: "Crypto Holder",
    emoji: "\u{1F4B0}",
    description: "Protect wallets, keys, and signing sessions",
  },
  journalist: {
    label: "Journalist / Activist",
    emoji: "\u{1F4F0}",
    description: "Maximum privacy — protect sources, resist surveillance",
  },
};

const categoryLabels: Record<Category, string> = {
  system: "System Security",
  network: "Network",
  privacy: "Privacy & Telemetry",
  encryption: "Encryption",
  browser: "Browser",
  advanced: "Advanced",
};

/* ------------------------------------------------------------------ */
/*  Hardening steps database                                           */
/* ------------------------------------------------------------------ */

const steps: HardeningStep[] = [
  // ===== SYSTEM =====
  {
    id: "firewall",
    title: "Enable firewall",
    description: "Block unauthorized incoming connections",
    category: "system",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on",
      undo: "sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off",
    },
    windows: {
      command: "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True",
      undo: "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False",
    },
  },
  {
    id: "firewall-stealth",
    title: "Enable stealth mode (firewall)",
    description: "Don't respond to probing requests (ICMP, port scans)",
    category: "system",
    risk: "low",
    profiles: ["privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on",
      undo: "sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode off",
    },
    windows: {
      command: "Set-NetFirewallProfile -Profile Domain,Public,Private -NotifyOnListen False\nnetsh advfirewall set allprofiles settings inboundusernotification disable",
    },
  },
  {
    id: "auto-updates",
    title: "Enable automatic security updates",
    description: "Ensure critical patches are installed immediately",
    category: "system",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate AutomaticCheckEnabled -bool true\nsudo defaults write /Library/Preferences/com.apple.SoftwareUpdate CriticalUpdateInstall -bool true\nsudo defaults write /Library/Preferences/com.apple.SoftwareUpdate AutomaticDownload -bool true",
    },
    windows: {
      command: "# Enable Windows Update auto-install\nreg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU\" /v AUOptions /t REG_DWORD /d 4 /f\nreg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU\" /v NoAutoUpdate /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "screen-lock",
    title: "Auto-lock screen after 2 minutes",
    description: "Prevent unauthorized access when you step away",
    category: "system",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "defaults write com.apple.screensaver idleTime -int 120\ndefaults write com.apple.screensaver askForPassword -int 1\ndefaults write com.apple.screensaver askForPasswordDelay -int 0",
    },
    windows: {
      command: "# Set screen timeout to 2 minutes and require password\npowercfg /change standby-timeout-ac 2\nreg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v InactivityTimeoutSecs /t REG_DWORD /d 120 /f",
    },
  },
  {
    id: "disable-remote",
    title: "Disable remote login and remote management",
    description: "Close remote access vectors",
    category: "system",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "sudo systemsetup -setremotelogin off\nsudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -deactivate -configure -access -off",
    },
    windows: {
      command: "# Disable Remote Desktop\nreg add \"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\" /v fDenyTSConnections /t REG_DWORD /d 1 /f\nnet stop TermService /y",
    },
  },
  {
    id: "disable-guest",
    title: "Disable guest account",
    description: "Prevent unauthorized local access",
    category: "system",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "sudo defaults write /Library/Preferences/com.apple.loginwindow GuestEnabled -bool false",
    },
    windows: {
      command: "net user Guest /active:no",
    },
  },
  {
    id: "login-message",
    title: "Show custom login window message",
    description: "Display contact info in case of loss/theft",
    category: "system",
    risk: "low",
    profiles: ["standard", "executive"],
    macos: {
      command: "sudo defaults write /Library/Preferences/com.apple.loginwindow LoginwindowText \"If found, contact: your@email.com\"",
      undo: "sudo defaults delete /Library/Preferences/com.apple.loginwindow LoginwindowText",
    },
    windows: {
      command: "reg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v legalnoticecaption /t REG_SZ /d \"If found\" /f\nreg add \"HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" /v legalnoticetext /t REG_SZ /d \"Contact: your@email.com\" /f",
    },
  },

  // ===== NETWORK =====
  {
    id: "disable-wifi-auto",
    title: "Disable auto-join for unknown Wi-Fi networks",
    description: "Prevent connecting to rogue access points",
    category: "network",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "sudo defaults write /Library/Preferences/SystemConfiguration/com.apple.airport.preferences JoinMode -string \"Preferred\"",
    },
    windows: {
      command: "# Disable auto-connect to suggested open hotspots\nreg add \"HKLM\\SOFTWARE\\Microsoft\\WcmSvc\\wifinetworkmanager\\config\" /v AutoConnectAllowedOEM /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "dns-over-https",
    title: "Use encrypted DNS (DoH)",
    description: "Prevent DNS snooping by ISP or network operators",
    category: "network",
    risk: "low",
    profiles: ["privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "# Install a DoH profile (Cloudflare 1.1.1.1 or Quad9)\n# Download from: https://github.com/paulmillr/encrypted-dns\n# Or manually set DNS:\nnetworksetup -setdnsservers Wi-Fi 1.1.1.1 1.0.0.1",
    },
    windows: {
      command: "# Set DNS to Cloudflare with DoH\nSet-DnsClientServerAddress -InterfaceAlias \"Wi-Fi\" -ServerAddresses 1.1.1.1,1.0.0.1\n# Enable DoH (Windows 11)\nreg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\Dnscache\\Parameters\" /v EnableAutoDoh /t REG_DWORD /d 2 /f",
    },
  },
  {
    id: "disable-bluetooth",
    title: "Disable Bluetooth when not in use",
    description: "Reduce wireless attack surface",
    category: "network",
    risk: "medium",
    profiles: ["executive", "crypto", "journalist"],
    macos: {
      command: "# Requires blueutil (brew install blueutil)\nblueutil --power 0",
      undo: "blueutil --power 1",
    },
    windows: {
      command: "# Disable Bluetooth service\nStop-Service bthserv\nSet-Service bthserv -StartupType Disabled",
      undo: "Set-Service bthserv -StartupType Manual\nStart-Service bthserv",
    },
  },

  // ===== PRIVACY & TELEMETRY =====
  {
    id: "disable-siri",
    title: "Disable voice assistant data collection",
    description: "Stop Siri/Cortana from sending voice data",
    category: "privacy",
    risk: "low",
    profiles: ["privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "defaults write com.apple.assistant.support \"Assistant Enabled\" -bool false\ndefaults write com.apple.Siri StatusMenuVisible -bool false",
      undo: "defaults write com.apple.assistant.support \"Assistant Enabled\" -bool true",
    },
    windows: {
      command: "# Disable Cortana\nreg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search\" /v AllowCortana /t REG_DWORD /d 0 /f\n# Disable online speech recognition\nreg add \"HKCU\\SOFTWARE\\Microsoft\\Speech_OneCore\\Settings\\OnlineSpeechPrivacy\" /v HasAccepted /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "disable-telemetry",
    title: "Minimize OS telemetry",
    description: "Reduce diagnostic and usage data sent to Apple/Microsoft",
    category: "privacy",
    risk: "low",
    profiles: ["privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "defaults write com.apple.CrashReporter DialogType -string \"none\"\ndefaults write com.apple.SoftwareUpdate SendSystemProfile -bool false",
    },
    windows: {
      command: "# Set telemetry to minimum (Security level)\nreg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection\" /v AllowTelemetry /t REG_DWORD /d 0 /f\n# Disable feedback\nreg add \"HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules\" /v NumberOfSIUFInPeriod /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "disable-ad-tracking",
    title: "Disable advertising ID and tracking",
    description: "Stop personalized ad tracking across apps",
    category: "privacy",
    risk: "low",
    profiles: ["privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "defaults write com.apple.AdLib allowApplePersonalizedAdvertising -bool false",
    },
    windows: {
      command: "reg add \"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo\" /v Enabled /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "disable-location",
    title: "Disable location services (system-wide)",
    description: "Stop apps and OS from tracking your physical location",
    category: "privacy",
    risk: "medium",
    profiles: ["journalist", "crypto"],
    macos: {
      command: "sudo defaults write /var/db/locationd/Library/Preferences/ByHost/com.apple.locationd LocationServicesEnabled -int 0",
      undo: "sudo defaults write /var/db/locationd/Library/Preferences/ByHost/com.apple.locationd LocationServicesEnabled -int 1",
    },
    windows: {
      command: "reg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors\" /v DisableLocation /t REG_DWORD /d 1 /f",
      undo: "reg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors\" /v DisableLocation /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "disable-diagnostics-win",
    title: "Disable Windows diagnostic services",
    description: "Stop Connected User Experiences, DiagTrack, and dmwappushservice",
    category: "privacy",
    risk: "low",
    profiles: ["privacy", "journalist"],
    windows: {
      command: "Stop-Service DiagTrack\nSet-Service DiagTrack -StartupType Disabled\nStop-Service dmwappushservice\nSet-Service dmwappushservice -StartupType Disabled",
      undo: "Set-Service DiagTrack -StartupType Automatic\nStart-Service DiagTrack",
    },
  },

  // ===== ENCRYPTION =====
  {
    id: "full-disk-encryption",
    title: "Enable full-disk encryption",
    description: "Protect all data at rest — essential if device is lost or stolen",
    category: "encryption",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "sudo fdesetup enable",
      undo: "sudo fdesetup disable",
    },
    windows: {
      command: "# Enable BitLocker on C: drive\nmanage-bde -on C: -RecoveryPassword\n# IMPORTANT: Save your recovery key!",
    },
  },
  {
    id: "disable-hibernate-leak",
    title: "Disable hibernation (prevents RAM dump to disk)",
    description: "Hibernation writes decryption keys to disk — disable for security",
    category: "encryption",
    risk: "medium",
    profiles: ["executive", "crypto", "journalist"],
    macos: {
      command: "sudo pmset -a hibernatemode 0\nsudo rm -f /var/vm/sleepimage",
      undo: "sudo pmset -a hibernatemode 3",
    },
    windows: {
      command: "powercfg /hibernate off",
      undo: "powercfg /hibernate on",
    },
  },

  // ===== BROWSER =====
  {
    id: "disable-autofill",
    title: "Disable browser autofill for passwords and payment",
    description: "Use a dedicated password manager instead of browser storage",
    category: "browser",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "# Safari\ndefaults write com.apple.Safari AutoFillPasswords -bool false\ndefaults write com.apple.Safari AutoFillCreditCardData -bool false\ndefaults write com.apple.Safari AutoFillFromAddressBook -bool false",
    },
    windows: {
      command: "# Edge — disable password saving\nreg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge\" /v PasswordManagerEnabled /t REG_DWORD /d 0 /f\nreg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge\" /v AutofillCreditCardEnabled /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "disable-search-suggestions",
    title: "Disable search suggestions (prevents keystroke leaking)",
    description: "Every character you type gets sent to the search engine in real-time",
    category: "browser",
    risk: "low",
    profiles: ["privacy", "journalist"],
    macos: {
      command: "defaults write com.apple.Safari UniversalSearchEnabled -bool false\ndefaults write com.apple.Safari SuppressSearchSuggestions -bool true",
    },
    windows: {
      command: "# Edge\nreg add \"HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge\" /v SearchSuggestEnabled /t REG_DWORD /d 0 /f",
    },
  },

  // ===== ADVANCED =====
  {
    id: "disable-airdrop",
    title: "Disable AirDrop / Nearby Share",
    description: "Prevent unsolicited file transfers and device discovery",
    category: "advanced",
    risk: "low",
    profiles: ["executive", "crypto", "journalist"],
    macos: {
      command: "defaults write com.apple.NetworkBrowser DisableAirDrop -bool true",
      undo: "defaults write com.apple.NetworkBrowser DisableAirDrop -bool false",
    },
    windows: {
      command: "# Disable Nearby Sharing\nreg add \"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CDP\" /v NearShareChannelUserAuthzPolicy /t REG_DWORD /d 0 /f\nreg add \"HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CDP\" /v CdpSessionUserAuthzPolicy /t REG_DWORD /d 0 /f",
    },
  },
  {
    id: "lockdown-mode",
    title: "Enable Lockdown Mode (macOS) / Attack Surface Reduction (Windows)",
    description: "Maximum protection for high-risk individuals — may break some features",
    category: "advanced",
    risk: "high",
    profiles: ["journalist", "executive"],
    macos: {
      command: "# Enable Lockdown Mode (requires restart)\n# Go to: System Settings > Privacy & Security > Lockdown Mode > Turn On\n# CLI not available — must be enabled via System Settings",
    },
    windows: {
      command: "# Enable Attack Surface Reduction rules\nSet-MpPreference -AttackSurfaceReductionRules_Ids BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550 -AttackSurfaceReductionRules_Actions Enabled\nSet-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A -AttackSurfaceReductionRules_Actions Enabled\nSet-MpPreference -AttackSurfaceReductionRules_Ids 3B576869-A4EC-4529-8536-B80A7769E899 -AttackSurfaceReductionRules_Actions Enabled",
    },
  },
  {
    id: "disable-usb",
    title: "Block USB storage devices",
    description: "Prevent data exfiltration via USB drives (BadUSB attacks)",
    category: "advanced",
    risk: "high",
    profiles: ["executive", "crypto"],
    macos: {
      command: "# Disable USB mass storage kernel extension\nsudo kextunload /System/Library/Extensions/IOUSBMassStorageClass.kext 2>/dev/null || echo 'Note: On Apple Silicon, use MDM profiles to restrict USB storage'",
    },
    windows: {
      command: "# Disable USB storage\nreg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR\" /v Start /t REG_DWORD /d 4 /f",
      undo: "reg add \"HKLM\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR\" /v Start /t REG_DWORD /d 3 /f",
    },
  },
  {
    id: "secure-boot",
    title: "Verify Secure Boot is enabled",
    description: "Prevents rootkits from loading before the OS",
    category: "advanced",
    risk: "low",
    profiles: ["standard", "privacy", "executive", "crypto", "journalist"],
    macos: {
      command: "# Check current security policy (Apple Silicon)\ncsrutil status\n# Should show: System Integrity Protection status: enabled.",
    },
    windows: {
      command: "# Check Secure Boot status\nConfirm-SecureBootUEFI\n# Should return True",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function OsHardening() {
  const [os, setOs] = useState<OS>("macos");
  const [profile, setProfile] = useState<Profile>("standard");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [generated, setGenerated] = useState<string | null>(null);
  const [showUndo, setShowUndo] = useState(false);

  const filteredSteps = steps.filter(
    (s) => s.profiles.includes(profile) && s[os]
  );

  const grouped = (Object.keys(categoryLabels) as Category[])
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat],
      items: filteredSteps.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  const toggleStep = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setGenerated(null);
  };

  const selectAll = () => {
    const ids = filteredSteps.map((s) => s.id);
    setSelected(new Set(ids));
    setGenerated(null);
  };

  const selectNone = () => {
    setSelected(new Set());
    setGenerated(null);
  };

  const generateScript = () => {
    const selectedSteps = filteredSteps.filter((s) => selected.has(s.id));
    if (selectedSteps.length === 0) return;

    const isPS = os === "windows";
    const commentChar = isPS ? "#" : "#";
    const header = isPS
      ? `# =====================================================\n# FK94 Security - Windows Hardening Script\n# Profile: ${profiles[profile].label}\n# Generated: ${new Date().toISOString().split("T")[0]}\n# https://fk94security.com\n# =====================================================\n# Run as Administrator in PowerShell\n# =====================================================\n\n`
      : `#!/bin/bash\n# =====================================================\n# FK94 Security - macOS Hardening Script\n# Profile: ${profiles[profile].label}\n# Generated: ${new Date().toISOString().split("T")[0]}\n# https://fk94security.com\n# =====================================================\n# Run with: chmod +x harden.sh && sudo ./harden.sh\n# =====================================================\n\n`;

    let script = header;

    const groupedSelected = (Object.keys(categoryLabels) as Category[])
      .map((cat) => ({
        label: categoryLabels[cat],
        items: selectedSteps.filter((s) => s.category === cat),
      }))
      .filter((g) => g.items.length > 0);

    for (const group of groupedSelected) {
      script += `${commentChar} --- ${group.label} ---\n\n`;
      for (const step of group.items) {
        const cmd = step[os]!;
        script += `${commentChar} ${step.title}\n`;
        script += `${commentChar} ${step.description}\n`;
        script += `${cmd.command}\n\n`;
        if (showUndo && cmd.undo) {
          script += `${commentChar} UNDO: ${cmd.undo}\n\n`;
        }
      }
    }

    script += `\n${commentChar} =====================================================\n`;
    script += `${commentChar} Done! Restart your computer to apply all changes.\n`;
    script += `${commentChar} For a professional security audit: https://fk94security.com/book\n`;
    script += `${commentChar} =====================================================\n`;

    setGenerated(script);
  };

  const downloadScript = () => {
    if (!generated) return;
    const ext = os === "windows" ? "ps1" : "sh";
    const filename = `fk94-harden-${os}-${profile}.${ext}`;
    const blob = new Blob([generated], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyScript = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
  };

  const riskColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  return (
    <div className="space-y-6">
      {/* OS Selector */}
      <section className="rounded-xl border border-line bg-card p-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Operating System
        </p>
        <div className="mt-4 flex gap-3">
          {(["macos", "windows"] as OS[]).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => { setOs(o); setSelected(new Set()); setGenerated(null); }}
              className={cn(
                "flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition",
                os === o
                  ? "bg-accent text-black"
                  : "border border-line bg-card/80 text-ink hover:border-accent/30"
              )}
            >
              {o === "macos" ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
              )}
              {o === "macos" ? "macOS" : "Windows"}
            </button>
          ))}
        </div>
      </section>

      {/* Profile Selector */}
      <section className="rounded-xl border border-line bg-card p-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Security Profile
        </p>
        <p className="mt-2 text-sm text-muted">
          Select your threat profile — this determines which hardening steps are included.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(profiles) as Profile[]).map((p) => {
            const info = profiles[p];
            const count = steps.filter(
              (s) => s.profiles.includes(p) && s[os]
            ).length;
            return (
              <button
                key={p}
                type="button"
                onClick={() => { setProfile(p); setSelected(new Set()); setGenerated(null); }}
                className={cn(
                  "rounded-xl border p-4 text-left transition",
                  profile === p
                    ? "border-accent/40 bg-accent/10"
                    : "border-line bg-card/80 hover:border-accent/30"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{info.emoji}</span>
                  <span className="text-sm font-semibold text-ink">{info.label}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{info.description}</p>
                <p className="mt-2 text-xs text-accent">{count} hardening steps</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Steps Selection */}
      <section className="rounded-xl border border-line bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Hardening Steps
            </p>
            <p className="mt-1 text-sm text-muted">
              {selected.size} of {filteredSteps.length} selected
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink transition hover:border-accent/30"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={selectNone}
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent/30"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {grouped.map((group) => (
            <div key={group.category}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
                {group.label}
              </h4>
              <div className="grid gap-2 lg:grid-cols-2">
                {group.items.map((step) => {
                  const isSelected = selected.has(step.id);
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => toggleStep(step.id)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition",
                        isSelected
                          ? "border-accent/30 bg-accent/10"
                          : "border-line/50 bg-surface/30 hover:border-accent/20"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs transition",
                            isSelected
                              ? "border-accent/30 bg-accent/20 text-accent"
                              : "border-line bg-card text-transparent"
                          )}
                        >
                          {isSelected ? "\u2713" : ""}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-semibold text-ink">{step.title}</h5>
                            <span className={cn("text-[10px] uppercase tracking-wider", riskColors[step.risk])}>
                              {step.risk}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted">{step.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Generate */}
      <section className="rounded-xl border border-line bg-card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={generateScript}
            disabled={selected.size === 0}
            className={cn(
              "rounded-lg px-6 py-3 text-sm font-semibold transition",
              selected.size > 0
                ? "bg-accent text-black hover:bg-accent-strong"
                : "cursor-not-allowed bg-line text-muted"
            )}
          >
            Generate {os === "windows" ? "PowerShell" : "Bash"} Script ({selected.size} steps)
          </button>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={showUndo}
              onChange={(e) => { setShowUndo(e.target.checked); setGenerated(null); }}
              className="rounded border-line"
            />
            Include undo commands
          </label>
        </div>

        {generated && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                {os === "windows" ? "PowerShell Script" : "Bash Script"}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copyScript}
                  className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink transition hover:border-accent/30"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={downloadScript}
                  className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition hover:bg-accent/20"
                >
                  Download .{os === "windows" ? "ps1" : "sh"}
                </button>
              </div>
            </div>
            <pre className="mt-3 max-h-[500px] overflow-auto rounded-lg border border-line bg-black/40 p-4 font-mono text-xs leading-6 text-green-400">
              {generated}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}
