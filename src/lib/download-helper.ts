"use client";

let activeDownloadWindow: Window | null = null;
let returnTimer: NodeJS.Timeout | null = null;

/**
 * Initiates file download from the provided URL in a companion window and
 * automatically returns the user to HS AI Studio by closing the companion
 * window once download starts or when focus returns.
 */
export function triggerFastDownloadAndReturn(
  downloadUrl: string,
  options?: {
    fileName?: string;
    onReturn?: () => void;
    returnDelayMs?: number;
  }
) {
  if (typeof window === "undefined" || !downloadUrl) return;

  // 1. If a previous companion window was open, close it
  try {
    if (activeDownloadWindow && !activeDownloadWindow.closed) {
      activeDownloadWindow.close();
    }
  } catch {}

  // 2. Open centered companion window for the cloud mirror
  const width = 860;
  const height = 660;
  const left = Math.max(0, (window.screen.width - width) / 2);
  const top = Math.max(0, (window.screen.height - height) / 2);

  try {
    activeDownloadWindow = window.open(
      downloadUrl,
      "HS_AI_CloudDownloader",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,toolbar=no`
    );
  } catch {
    // Fallback if popup is blocked
    activeDownloadWindow = window.open(downloadUrl, "_blank", "noopener,noreferrer");
  }

  // 3. Clear any existing timer
  if (returnTimer) {
    clearTimeout(returnTimer);
    returnTimer = null;
  }

  const autoCloseDelay = options?.returnDelayMs ?? 8000;

  // 4. Automatically close download window and return to HS AI Studio after delay
  returnTimer = setTimeout(() => {
    closeActiveDownloadWindow();
    options?.onReturn?.();
  }, autoCloseDelay);

  // 5. When user clicks back or refocuses the HS AI Studio tab, close companion window
  const handleRefocus = () => {
    setTimeout(() => {
      closeActiveDownloadWindow();
      options?.onReturn?.();
    }, 1200);
  };

  window.addEventListener("focus", handleRefocus, { once: true });
}

/**
 * Closes the active cloud download companion window and returns focus directly to HS AI Studio.
 */
export function closeActiveDownloadWindow() {
  if (typeof window === "undefined") return;
  if (returnTimer) {
    clearTimeout(returnTimer);
    returnTimer = null;
  }
  try {
    if (activeDownloadWindow && !activeDownloadWindow.closed) {
      activeDownloadWindow.close();
    }
  } catch {}
  activeDownloadWindow = null;
  if (window.focus) {
    window.focus();
  }
}
