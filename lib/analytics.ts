export const GA_MEASUREMENT_ID = "G-6D4GRHB9V1";

export type AnalyticsParams = Record<string, string | number | boolean>;

export const trackEvent = (name: string, params: AnalyticsParams = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
