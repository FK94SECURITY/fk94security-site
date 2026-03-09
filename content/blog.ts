export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "breach-alert" | "security-tip" | "tool-update" | "news";
  readTime: string;
  content: string;
};

export const blogCategories = [
  { key: "all" as const, label: "All" },
  { key: "breach-alert" as const, label: "Breach Alerts" },
  { key: "security-tip" as const, label: "Security Tips" },
  { key: "tool-update" as const, label: "Tool Updates" },
  { key: "news" as const, label: "News" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "national-public-data-breach-check",
    title: "How to Check If Your Data Was in the National Public Data Breach",
    excerpt:
      "Nearly 800 million records were exposed, including Social Security numbers and home addresses. Here is how to check if you were affected and what to do next.",
    date: "2025-08-15",
    category: "breach-alert",
    readTime: "6 min read",
    content: `
      <p>In August 2024, a massive breach at National Public Data (NPD) exposed approximately 2.9 billion rows of data, affecting an estimated 800 million individuals. The leaked dataset included full names, Social Security numbers, mailing addresses, email addresses, and phone numbers going back at least three decades.</p>

      <p>This was not a breach of an account you signed up for. NPD is a data broker that aggregates public records, court filings, and other databases to sell background check information. Most people affected had no idea NPD even had their data.</p>

      <h2>What was exposed</h2>
      <p>The breach contained records with the following fields:</p>
      <ul>
        <li>Full legal name and known aliases</li>
        <li>Social Security number</li>
        <li>Current and previous mailing addresses (sometimes going back 20+ years)</li>
        <li>Phone numbers</li>
        <li>Email addresses</li>
        <li>Dates of birth</li>
        <li>Relatives and known associates</li>
      </ul>

      <p>The data was initially offered for sale on dark web forums for $3.5 million and was later leaked for free in its entirety.</p>

      <h2>How to check if you were affected</h2>
      <p>Several services have indexed the breach data to let you check your exposure:</p>
      <ul>
        <li><strong>npd.pentester.com</strong> - A free lookup tool that checks your name, state, and birth year against the leaked dataset. It shows which records matched and what data was included.</li>
        <li><strong>Have I Been Pwned</strong> (haveibeenpwned.com) - Troy Hunt added the NPD breach to his database. Enter your email address to see if it appeared in this or any other breach.</li>
        <li><strong>Mozilla Monitor</strong> - A free service from Mozilla that checks your email against known breaches and sends alerts for new ones.</li>
      </ul>

      <h2>What to do if you were exposed</h2>
      <p>If your Social Security number was in this breach (and statistically, it probably was if you are a US resident), take these steps:</p>

      <h3>1. Freeze your credit at all three bureaus</h3>
      <p>This is the single most important step. A credit freeze prevents anyone from opening new accounts in your name. It is free and takes about 10 minutes per bureau:</p>
      <ul>
        <li><strong>Equifax:</strong> equifax.com/personal/credit-report-services/credit-freeze/</li>
        <li><strong>Experian:</strong> experian.com/freeze/center.html</li>
        <li><strong>TransUnion:</strong> transunion.com/credit-freeze</li>
      </ul>
      <p>You will receive a PIN for each freeze. Store these PINs securely in your password manager. You will need them to temporarily lift the freeze when you legitimately apply for credit.</p>

      <h3>2. Set up fraud alerts</h3>
      <p>Place an initial fraud alert at one bureau (it propagates to the other two). This requires creditors to verify your identity before opening new accounts. It lasts one year and can be renewed.</p>

      <h3>3. Monitor your financial accounts</h3>
      <p>Review your bank and credit card statements for unauthorized activity. Set up transaction alerts so you are notified of any new charges in real time.</p>

      <h3>4. File an IRS Identity Protection PIN</h3>
      <p>Request an IP PIN from the IRS at irs.gov/identity-theft-fraud-scams/get-an-identity-protection-pin. This prevents someone from filing a fraudulent tax return using your SSN.</p>

      <h3>5. Be vigilant about phishing</h3>
      <p>Breaches like this fuel highly targeted phishing campaigns. Attackers now have your address, phone, and SSN, which makes their scam emails and calls much more convincing. Be skeptical of any unsolicited contact that references personal details, even if the details are accurate.</p>

      <h2>The bigger picture</h2>
      <p>The NPD breach is a reminder that your personal data exists in databases you never consented to. Data brokers operate in a regulatory gray area, and breaches like this expose the real cost of that model. While you cannot undo the exposure, you can take defensive steps to limit the damage. Freezing your credit is by far the highest-impact action most people can take.</p>
    `,
  },
  {
    slug: "sms-2fa-limitations",
    title: "Why SMS 2FA Is Better Than Nothing (But Not By Much)",
    excerpt:
      "SMS-based two-factor authentication is the most common second factor, but it has real weaknesses. Here is when it is acceptable and when you need to upgrade.",
    date: "2025-11-20",
    category: "security-tip",
    readTime: "5 min read",
    content: `
      <p>When a service offers two-factor authentication via SMS, your instinct might be to enable it and move on. And compared to no 2FA at all, SMS codes are a meaningful improvement. But understanding their weaknesses helps you make better decisions about where SMS is good enough and where it is not.</p>

      <h2>How SMS 2FA works</h2>
      <p>When you log in, the service sends a one-time code to your phone number via text message. You enter the code to complete authentication. The assumption is that only you have access to your phone and its SIM card.</p>

      <h2>The vulnerabilities</h2>

      <h3>SIM swap attacks</h3>
      <p>An attacker contacts your mobile carrier, impersonates you (often using information from data breaches), and convinces them to transfer your phone number to a new SIM card. Once they control your number, they receive all your SMS codes. This attack is well-documented and has been used to steal cryptocurrency, break into email accounts, and hijack social media profiles.</p>
      <p>SIM swaps have become a significant enough problem that the FCC issued new rules in 2023 requiring carriers to implement better verification before processing SIM changes. But enforcement and compliance vary.</p>

      <h3>SS7 vulnerabilities</h3>
      <p>The Signaling System 7 (SS7) protocol, which routes SMS messages globally, has known security flaws that allow interception. While exploiting SS7 requires access to telecom infrastructure, state-level actors and sophisticated criminal groups have demonstrated this capability. Researchers have shown it is possible to intercept SMS messages without any interaction with the victim's phone.</p>

      <h3>Malware and message forwarding</h3>
      <p>Mobile malware can read incoming SMS messages. Some Android malware specifically targets banking and authentication codes. Additionally, carrier features like call/text forwarding can sometimes be reconfigured through social engineering.</p>

      <h2>When SMS 2FA is acceptable</h2>
      <ul>
        <li><strong>Low-value accounts</strong> where the risk of compromise is annoying but not catastrophic (a forum, a shopping site, a streaming service).</li>
        <li><strong>When it is the only option.</strong> Some services only offer SMS-based 2FA. In that case, using it is still better than going without.</li>
        <li><strong>For users who will not adopt anything more complex.</strong> If the choice is between SMS 2FA and no 2FA, always choose SMS.</li>
      </ul>

      <h2>When you should upgrade</h2>
      <ul>
        <li><strong>Email accounts</strong> (especially your primary). Your email is the recovery mechanism for almost everything else.</li>
        <li><strong>Financial accounts and cryptocurrency.</strong> SIM swap attacks specifically target these.</li>
        <li><strong>Password managers.</strong> If your vault is compromised, everything inside it is exposed.</li>
        <li><strong>Cloud storage</strong> with sensitive documents.</li>
        <li><strong>Any account where you are a high-value target</strong> (public figure, executive, journalist, activist).</li>
      </ul>

      <h2>Better alternatives</h2>
      <ul>
        <li><strong>Authenticator apps</strong> (Google Authenticator, Authy, Bitwarden Authenticator): Generate codes locally on your device. Not vulnerable to SIM swaps or SS7 attacks.</li>
        <li><strong>Hardware security keys</strong> (YubiKey, Google Titan): Phishing-resistant by design. The strongest consumer-grade 2FA available.</li>
        <li><strong>Passkeys:</strong> The newest standard, combining convenience with strong security. Supported by Google, Apple, Microsoft, and an increasing number of services.</li>
      </ul>

      <h2>Practical advice</h2>
      <p>Do not remove SMS 2FA from an account unless you are replacing it with something stronger. The biggest risk is not having any second factor at all. But for your most important accounts, take the time to set up an authenticator app or hardware key. The effort is minimal and the security improvement is substantial.</p>

      <p>If you must use SMS for important accounts, contact your carrier and add a PIN or passphrase requirement to your account. This makes SIM swap attacks harder (though not impossible).</p>
    `,
  },
  {
    slug: "passkeys-what-you-need-to-know",
    title: "Passkeys Are Here: What You Need to Know",
    excerpt:
      "Passkeys replace passwords with cryptographic keys tied to your device and biometrics. They are phishing-resistant, easier to use, and already supported by major platforms.",
    date: "2026-01-05",
    category: "security-tip",
    readTime: "7 min read",
    content: `
      <p>Passkeys are the most significant change in authentication in over a decade. They replace traditional passwords with cryptographic key pairs stored on your device and unlocked with biometrics or a device PIN. No more remembering passwords. No more phishing. No more credential stuffing.</p>

      <h2>How passkeys work</h2>
      <p>When you create a passkey for a website, your device generates a unique cryptographic key pair. The private key stays on your device (secured by your fingerprint, face, or PIN). The public key is sent to the website. When you log in, the website sends a challenge, your device signs it with the private key, and the website verifies it with the public key.</p>
      <p>You never type a password. You never see a code. You just authenticate with your fingerprint or face, the same way you unlock your phone.</p>

      <h2>Why passkeys are more secure than passwords</h2>
      <ul>
        <li><strong>Phishing-resistant:</strong> Passkeys are bound to the specific website domain. A fake login page cannot trick your device into using a passkey meant for the real site.</li>
        <li><strong>No shared secrets:</strong> Unlike passwords, the private key never leaves your device. There is nothing stored on the server that can be stolen and used to log in.</li>
        <li><strong>No reuse:</strong> Each passkey is unique to one service. A breach at one site does not affect your other accounts.</li>
        <li><strong>No credential stuffing:</strong> Attackers cannot try leaked passwords from other breaches because there are no passwords to leak.</li>
      </ul>

      <h2>Which services support passkeys</h2>
      <p>As of late 2024, passkey support is growing rapidly:</p>
      <ul>
        <li><strong>Google:</strong> Full passkey support for all Google accounts. Can be used as primary login method.</li>
        <li><strong>Apple:</strong> Passkeys synced across all Apple devices via iCloud Keychain. Works in Safari and apps.</li>
        <li><strong>Microsoft:</strong> Passkey support for Microsoft accounts and Windows Hello integration.</li>
        <li><strong>GitHub:</strong> Passkeys as a primary authentication method.</li>
        <li><strong>PayPal, eBay, Best Buy, Kayak:</strong> Consumer services adding passkey support.</li>
        <li><strong>1Password, Dashlane, Bitwarden:</strong> Password managers that can store and manage passkeys cross-platform.</li>
      </ul>
      <p>Check <strong>passkeys.directory</strong> for an up-to-date list of services that support passkeys.</p>

      <h2>How to set up passkeys</h2>
      <p>The process varies by platform but generally follows these steps:</p>
      <ol>
        <li>Go to the security settings of a supported service (e.g., myaccount.google.com).</li>
        <li>Look for "Passkeys" or "Sign-in methods" and select "Create a passkey."</li>
        <li>Your device will prompt you to verify with biometrics (fingerprint/face) or your device PIN.</li>
        <li>The passkey is created and stored on your device.</li>
        <li>Next time you log in, choose "Sign in with a passkey" and authenticate with biometrics.</li>
      </ol>

      <h2>Cross-device considerations</h2>
      <p>Passkeys created on Apple devices sync across your Apple ecosystem via iCloud Keychain. Google syncs passkeys across Android devices via Google Password Manager. For cross-platform use (e.g., using an Android passkey to log into a website on a Mac), you can use a QR code to authenticate via your phone.</p>
      <p>Password managers like 1Password and Bitwarden can store passkeys and make them available across all platforms, which solves the cross-ecosystem problem.</p>

      <h2>Limitations and trade-offs</h2>
      <ul>
        <li><strong>Not yet universal.</strong> Many services still only support passwords. You will need passwords for a while yet.</li>
        <li><strong>Recovery can be tricky.</strong> If you lose all your devices and do not have passkeys synced to a cloud service or password manager, recovery may require traditional methods.</li>
        <li><strong>Shared accounts are harder.</strong> Passkeys are tied to individual devices/accounts, which complicates shared logins.</li>
        <li><strong>Enterprise adoption is slow.</strong> Many workplace applications do not yet support passkeys.</li>
      </ul>

      <h2>What to do now</h2>
      <p>Start by creating passkeys for your most important accounts: Google, Apple, Microsoft, and your password manager. Keep your existing passwords and 2FA as backup methods until passkeys are fully established. Over time, as more services adopt passkeys, passwords will become the fallback rather than the primary method.</p>

      <p>Passkeys are not a future concept. They are available now, they are easier than passwords, and they are meaningfully more secure. There is no reason not to start using them today on the services that support them.</p>
    `,
  },
  {
    slug: "lastpass-breach-lessons",
    title: "The LastPass Breach: Lessons for Everyone",
    excerpt:
      "The LastPass breach exposed encrypted password vaults for millions of users. Here is what happened, who is at risk, and what to do whether or not you were a user.",
    date: "2025-07-10",
    category: "breach-alert",
    readTime: "7 min read",
    content: `
      <p>The LastPass breach is one of the most significant security incidents in password manager history. It did not just expose email addresses or metadata. Attackers obtained encrypted copies of user password vaults, which means every credential stored inside those vaults is potentially at risk if the master password was weak.</p>

      <h2>What happened</h2>
      <p>The breach unfolded in two stages:</p>
      <ul>
        <li><strong>August 2022:</strong> An attacker compromised a LastPass developer's workstation and gained access to source code and technical documentation.</li>
        <li><strong>November 2022:</strong> Using information from the first breach, the attacker targeted a senior DevOps engineer's home computer, exploited a vulnerability in third-party software, and gained access to cloud storage containing customer vault backups.</li>
      </ul>
      <p>The stolen data included:</p>
      <ul>
        <li>Encrypted password vaults (the entire contents of every stored credential)</li>
        <li>Unencrypted metadata: website URLs, account email addresses, and when entries were last used</li>
        <li>Company names, billing addresses, and IP addresses</li>
      </ul>

      <h2>Who is at risk</h2>
      <p>Anyone who had a LastPass account at the time of the breach has their encrypted vault in the attacker's hands. The level of risk depends on the strength of the master password:</p>
      <ul>
        <li><strong>High risk:</strong> Users with short master passwords (under 12 characters), dictionary words, or common patterns. These can be cracked with modern GPU hardware.</li>
        <li><strong>Medium risk:</strong> Users with moderate master passwords (12-16 characters) and older LastPass accounts where the encryption iteration count was set to a low default (5,000 PBKDF2 iterations instead of the current 600,000).</li>
        <li><strong>Lower risk:</strong> Users with strong, unique master passwords (16+ characters, random) and accounts with high iteration counts. Cracking these vaults is computationally expensive but not impossible given enough time.</li>
      </ul>

      <h2>The metadata problem</h2>
      <p>Even without cracking the vault encryption, the attackers have the unencrypted website URLs for every credential. This tells them exactly which services each user has accounts with: banking sites, cryptocurrency exchanges, corporate VPNs, healthcare portals. This metadata alone enables highly targeted phishing campaigns.</p>

      <h2>What to do if you were a LastPass user</h2>
      <ol>
        <li><strong>Change your most critical passwords immediately.</strong> Start with email, banking, and any account tied to financial assets. Do not wait.</li>
        <li><strong>Migrate to a different password manager.</strong> Bitwarden (free, open source) and 1Password are the most recommended alternatives. Export your vault and import it into the new manager.</li>
        <li><strong>Rotate all stored passwords.</strong> Systematically go through every entry in your old vault and change the password on each service. Prioritize financial, email, cloud, and crypto accounts.</li>
        <li><strong>Enable strong 2FA everywhere.</strong> Any account with only a password is now more vulnerable. Add authenticator app or hardware key 2FA to every important service.</li>
        <li><strong>Check for unauthorized access.</strong> Review recent activity on all critical accounts. Look for password changes, recovery email modifications, or new device logins you do not recognize.</li>
        <li><strong>Watch for targeted phishing.</strong> Attackers know which services you use. Be especially cautious of emails or messages referencing specific accounts.</li>
      </ol>

      <h2>Lessons for everyone</h2>
      <p>Even if you never used LastPass, this breach teaches important lessons:</p>
      <ul>
        <li><strong>Your master password matters enormously.</strong> It is the single key that protects everything else. Use a long, random passphrase.</li>
        <li><strong>Not all password managers are equal.</strong> Evaluate the security architecture, not just the features. Look for zero-knowledge encryption, open-source code, and independent security audits.</li>
        <li><strong>Metadata is data.</strong> Even encrypted systems leak information through URLs, timestamps, and account associations.</li>
        <li><strong>Cloud backups are targets.</strong> Any data stored in the cloud is one misconfiguration or compromised credential away from exposure.</li>
      </ul>

      <p>The LastPass breach is a reminder that security tools are not magic. They reduce risk, but they introduce their own attack surface. Choose tools carefully, use strong master passwords, and maintain the discipline of rotating credentials when the landscape changes.</p>
    `,
  },
  {
    slug: "iphone-privacy-settings",
    title: "5 Privacy Settings You Should Change on iPhone Right Now",
    excerpt:
      "Your iPhone ships with privacy defaults that favor convenience over protection. These five settings take five minutes to change and meaningfully reduce your exposure.",
    date: "2026-02-01",
    category: "security-tip",
    readTime: "5 min read",
    content: `
      <p>Apple markets the iPhone as the privacy-friendly smartphone, and relative to the competition, it is. But the default settings still share more data than most people realize. These five changes take a few minutes and make a real difference.</p>

      <h2>1. Lock down location services</h2>
      <p>Go to <strong>Settings &gt; Privacy &amp; Security &gt; Location Services</strong> and review every app in the list.</p>
      <ul>
        <li>Set most apps to <strong>"While Using"</strong> instead of "Always." Very few apps need your location in the background.</li>
        <li>For apps that do not need location at all (games, calculators, note apps), set them to <strong>"Never."</strong></li>
        <li>Disable <strong>"Precise Location"</strong> for apps that only need your general area (weather, news, delivery).</li>
        <li>Scroll to the bottom and review <strong>System Services</strong>. Disable "iPhone Analytics," "Routing & Traffic," and "Improve Maps" unless you specifically want to share this data with Apple.</li>
      </ul>

      <h2>2. Disable app tracking</h2>
      <p>Go to <strong>Settings &gt; Privacy &amp; Security &gt; Tracking</strong>.</p>
      <ul>
        <li>Turn off <strong>"Allow Apps to Request to Track."</strong> This blanket-denies all tracking requests without even showing you the prompt.</li>
        <li>When this is disabled, apps are told not to track you across other companies' apps and websites. Not all apps comply, but most do because Apple enforces the policy at the App Store level.</li>
      </ul>
      <p>This single toggle is one of the most impactful privacy settings on any smartphone. Facebook estimated that this feature alone cost them $10 billion in ad revenue in 2022, which tells you how much data it was preventing them from collecting.</p>

      <h2>3. Harden Safari privacy</h2>
      <p>Go to <strong>Settings &gt; Apps &gt; Safari</strong>.</p>
      <ul>
        <li>Enable <strong>"Prevent Cross-Site Tracking."</strong> This blocks third-party cookies that track you across websites.</li>
        <li>Enable <strong>"Hide IP Address"</strong> from trackers (and from websites if you want more privacy).</li>
        <li>Set <strong>"Fraudulent Website Warning"</strong> to on.</li>
        <li>Under <strong>"Advanced,"</strong> consider enabling <strong>"Advanced Tracking and Fingerprinting Protection"</strong> in all browsing (not just private).</li>
      </ul>

      <h2>4. Review Siri and search data</h2>
      <p>Go to <strong>Settings &gt; Siri</strong> (or <strong>Settings &gt; Apple Intelligence &amp; Siri</strong> on iOS 18+).</p>
      <ul>
        <li>If you do not use Siri, turn it off entirely. Siri processes audio data that is occasionally reviewed by Apple contractors.</li>
        <li>If you use Siri, go to <strong>Siri &amp; Search History</strong> and delete your history periodically.</li>
        <li>Disable <strong>"Listen for"</strong> wake words if you do not want the microphone passively listening.</li>
        <li>Review which apps can show suggestions in Search and disable any that do not add value.</li>
      </ul>

      <h2>5. Know about Lockdown Mode</h2>
      <p>Go to <strong>Settings &gt; Privacy &amp; Security &gt; Lockdown Mode</strong>.</p>
      <p>Lockdown Mode is not for everyone, but you should know it exists. It is designed for people who face serious, targeted threats (journalists, activists, executives). When enabled, it:</p>
      <ul>
        <li>Blocks most message attachment types</li>
        <li>Disables link previews in Messages</li>
        <li>Blocks incoming FaceTime calls from unknown numbers</li>
        <li>Restricts web browsing features that can be exploited</li>
        <li>Blocks wired connections to computers when the phone is locked</li>
        <li>Prevents configuration profiles from being installed</li>
      </ul>
      <p>For most people, the first four settings above are sufficient. But if you are in a situation where you might be targeted by sophisticated attackers or spyware, Lockdown Mode provides a meaningful additional layer of protection.</p>

      <h2>Bonus: Check your app privacy reports</h2>
      <p>Go to <strong>Settings &gt; Privacy &amp; Security &gt; App Privacy Report</strong>. This shows you which apps have accessed your location, camera, microphone, contacts, and photos in the last seven days, and which domains they have contacted. Review this periodically to spot apps that are reaching out to trackers or accessing sensors they should not need.</p>
    `,
  },
  {
    slug: "mfa-bypass-phishing-defense",
    title: "New Phishing Technique Bypasses MFA - Here's How to Stay Safe",
    excerpt:
      "Adversary-in-the-middle phishing attacks can capture session tokens in real time, bypassing even app-based MFA. Learn how they work and what actually protects you.",
    date: "2026-03-01",
    category: "news",
    readTime: "6 min read",
    content: `
      <p>A growing category of phishing attacks can now bypass traditional multi-factor authentication in real time. These are not theoretical. They are actively being used against corporate and individual targets, and they work against SMS codes, authenticator apps, and push notifications. Understanding how they work is the first step toward defending against them.</p>

      <h2>How adversary-in-the-middle (AitM) attacks work</h2>
      <p>Traditional phishing creates a fake login page that captures your username and password. AitM phishing goes further: it acts as a real-time proxy between you and the legitimate website.</p>
      <ol>
        <li>You receive a phishing email with a link to what looks like a legitimate login page.</li>
        <li>The phishing page is actually a reverse proxy. When you enter your credentials, it forwards them to the real site in real time.</li>
        <li>The real site sends an MFA prompt (SMS code, authenticator code, push notification). You complete the MFA step normally.</li>
        <li>The proxy captures the authenticated session cookie/token from the real site's response.</li>
        <li>The attacker now has your valid session token. They can use it to access your account without needing your password or MFA again, until the session expires.</li>
      </ol>

      <h2>Tools making this accessible</h2>
      <p>What makes this particularly dangerous is that it has been industrialized. Open-source tools and phishing-as-a-service platforms have made AitM attacks accessible to attackers with minimal technical skill:</p>
      <ul>
        <li><strong>Evilginx:</strong> An open-source framework that automates AitM phishing. It handles SSL certificates, captures credentials and session tokens, and can be deployed in minutes.</li>
        <li><strong>Modlishka:</strong> Another reverse proxy tool designed for phishing that captures tokens in real time.</li>
        <li><strong>Phishing-as-a-Service platforms:</strong> Criminal services that provide ready-made AitM kits targeting specific services (Microsoft 365, Google Workspace, banking sites).</li>
      </ul>

      <h2>What does NOT protect you</h2>
      <ul>
        <li><strong>SMS codes:</strong> The proxy captures and forwards them in real time.</li>
        <li><strong>Authenticator app codes (TOTP):</strong> Same problem. The code is valid and gets used immediately by the proxy.</li>
        <li><strong>Push notifications:</strong> You approve the push on your phone, thinking the login is legitimate. The proxy captures the resulting session.</li>
        <li><strong>Being careful about passwords:</strong> The attack does not need you to make a password mistake. It captures the authenticated session after you do everything right.</li>
      </ul>

      <h2>What DOES protect you</h2>

      <h3>Hardware security keys (FIDO2/WebAuthn)</h3>
      <p>Hardware keys like YubiKey and Google Titan Key are resistant to AitM attacks because they verify the domain of the website as part of the authentication protocol. When you insert or tap your security key, it checks that the domain matches the one it was registered with. A proxy on a different domain cannot pass this check, so the authentication fails.</p>
      <p>This is not a theoretical advantage. It is the reason Google reported zero successful phishing attacks on its 85,000+ employees after mandating hardware keys company-wide.</p>

      <h3>Passkeys</h3>
      <p>Passkeys use the same FIDO2/WebAuthn protocol as hardware keys and inherit the same phishing resistance. They verify the website domain cryptographically, which means an AitM proxy cannot intercept the authentication.</p>

      <h3>Conditional access policies</h3>
      <p>For organizations, policies that restrict access based on device compliance, network location, or risk signals can limit the usefulness of stolen session tokens. Even if an attacker captures a token, they may not be able to use it from an unrecognized device or location.</p>

      <h2>How to detect if you have been targeted</h2>
      <ul>
        <li><strong>Check the URL carefully.</strong> AitM phishing domains are often close to the real domain but not exact. Look for subtle misspellings, extra subdomains, or unusual TLDs.</li>
        <li><strong>Review recent account activity.</strong> If you suspect you clicked a suspicious link and authenticated, check your account's security activity for logins from unfamiliar locations or devices.</li>
        <li><strong>Revoke active sessions.</strong> Most services (Google, Microsoft, etc.) let you sign out of all active sessions. Do this if you suspect a compromise.</li>
        <li><strong>Check for account changes.</strong> Look for modified recovery options, new forwarding rules, new app authorizations, or changed security settings.</li>
      </ul>

      <h2>What to do now</h2>
      <p>For your most important accounts (email, financial, cloud storage), set up a hardware security key or passkey as your primary authentication method. This is the only consumer-grade defense that reliably stops AitM phishing.</p>
      <p>For accounts that do not support FIDO2, continue using authenticator apps. They are still effective against traditional phishing, which remains far more common than AitM attacks. But understand that they are not a complete defense against sophisticated, targeted campaigns.</p>
      <p>The authentication landscape is shifting. Passwords are becoming the weakest link, traditional MFA is no longer bulletproof, and phishing-resistant methods like passkeys and hardware keys are becoming essential rather than optional.</p>
    `,
  },
];
