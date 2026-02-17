'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TRACK_VISIT_URL = 'https://nvztjpbcjrpekbvdnnhq.supabase.co/functions/v1/track-visit';

/**
 * TrackVisit Component
 *
 * Tracks page visits for analytics. Set your app name in .env.local:
 * NEXT_PUBLIC_METRICS_APP_NAME=your-app-name
 *
 * Or update the app_name directly in this file.
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
        await fetch(TRACK_VISIT_URL, {
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
