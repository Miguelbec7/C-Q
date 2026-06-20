export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 9h2.5V6.2H14c-2.1 0-3.5 1.5-3.5 3.7V12H8v3h2.5v6H13v-6h2.3l.4-3H13v-1.9c0-.7.3-1.1 1-1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 10.5v6M7.5 8v-.01M11.5 16.5v-3.7c0-1.1.7-1.8 1.8-1.8 1 0 1.7.7 1.7 1.8v3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11.5 10.5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
