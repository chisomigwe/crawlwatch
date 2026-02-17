'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const METRICS_API_URL = process.env.NEXT_PUBLIC_METRICS_API_URL || 'https://igwe-industry-alerts.vercel.app';

/**
 * TrackVisit Component
 *
 * Tracks page visits for analytics.
 *
 * Set in .env.local:
 *   NEXT_PUBLIC_METRICS_APP_NAME=your-app-name
 *   NEXT_PUBLIC_METRICS_API_URL=https://your-metrics-dashboard.vercel.app (optional)
 */
export default function TrackVisit() {
  const pathname = usePathname();
  const appName = process.env.NEXT_PUBLIC_METRICS_APP_NAME || 'your-app-name';

  useEffect(() => {
    // Skip tracking if app name is not configured
    if (appName === 'your-app-name') {
      return;
    }

    async function trackVisit() {
      try {
        await fetch(`${METRICS_API_URL}/api/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            app_name: appName,
            page_url: pathname,
            referrer: document.referrer || null,
          }),
        });
      } catch (error) {
        // Silent fail - don't break the app if tracking fails
        console.error('[TrackVisit] Error:', error);
      }
    }

    trackVisit();
  }, [pathname, appName]);

  return null;
}
