export const GA_MEASUREMENT_ID = "G-6D4GRHB9V1";

export type AnalyticsParams = Record<string, string | number | boolean>;

export const trackEvent = (name: string, params: AnalyticsParams = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};

export const grantAnalyticsConsent = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
