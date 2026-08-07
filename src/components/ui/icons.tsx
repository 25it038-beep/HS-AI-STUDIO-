export function ArrowUpRight({
  className = "",
  accent,
}: {
  className?: string;
  accent?: string;
}) {
  const color = accent ?? "currentColor";
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`h-[0.9em] w-[0.9em] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`h-[0.85em] w-[0.85em] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M6 3H3.5V12.5H13V10M8 8L13 3M13 3H9.5M13 3V6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={`h-2 w-2 ${className}`} aria-hidden="true">
      <circle cx="4" cy="4" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true" fill="currentColor">
      <path d="M2.75 1.9c0-.62.68-1 1.21-.69l6.5 3.95c.54.33.54 1.1 0 1.44l-6.5 3.94c-.53.32-1.21-.08-1.21-.69V1.9z" />
    </svg>
  );
}

export function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`h-[0.9em] w-[0.9em] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M8 10V2M8 10L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}