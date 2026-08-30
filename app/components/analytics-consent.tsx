"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { grantAnalyticsConsent } from "../../lib/analytics";

const CONSENT_KEY = "voice-the-line-analytics-consent";

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_KEY);
    if (consent === "granted") grantAnalyticsConsent();
    if (!consent) setVisible(true);
  }, []);

  const choose = (value: "granted" | "denied") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    if (value === "granted") grantAnalyticsConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="analytics-consent" aria-label="Analytics settings">
      <div className="analytics-consent-copy"><strong>Help improve the studio</strong><p>Allow anonymous Google Analytics measurements for page visits and basic feature usage. Your microphone recordings are never sent.</p><Link href="/privacy/">Privacy details</Link></div>
      <div className="analytics-consent-actions"><button className="analytics-button accept" onClick={() => choose("granted")}>Allow analytics</button><button className="analytics-button decline" onClick={() => choose("denied")}>Continue without</button></div>
    </aside>
  );
}
