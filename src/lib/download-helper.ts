"use client";

/**
 * Initiates file download from the provided URL while ensuring the user rapidly
 * returns back to the HS AI Studio workspace without getting stranded on external host pages.
 */
export function triggerFastDownloadAndReturn(
  downloadUrl: string,
  options?: {
    onReturn?: () => void;
    returnDelayMs?: number;
  }
) {
  if (typeof window === "undefined" || !downloadUrl) return;

  // 1. Silent invisible iframe download attempt (browser downloads in background)
  try {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = downloadUrl;
    document.body.appendChild(iframe);
    setTimeout(() => {
      try {
        iframe.remove();
      } catch {}
    }, 15000);
  } catch {}

  // 2. Open cloud download mirror in a background tab
  try {
    const downloadTab = window.open(downloadUrl, "_blank", "noopener,noreferrer");
    // Ensure parent HS AI Studio window retains active focus
    if (window.focus) {
      window.focus();
    }
    // Attempt rapid window blur on external tab if accessible
    if (downloadTab && downloadTab.blur) {
      try {
        downloadTab.blur();
      } catch {}
    }
  } catch {}

  // 3. Immediately refocus current HS AI Studio window
  if (window.focus) {
    window.focus();
  }

  // 4. Trigger rapid return callback to HS AI Studio view
  if (options?.onReturn) {
    setTimeout(() => {
      options.onReturn?.();
    }, options.returnDelayMs ?? 1600);
  }
}
