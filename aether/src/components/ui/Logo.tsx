export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
    >
      <circle cx="14" cy="14" r="12" stroke="var(--color-energy-glow)" strokeWidth="0.8" opacity="0.5" />
      <circle cx="14" cy="14" r="3" fill="var(--color-energy-glow)" opacity="0.8" />
      <ellipse cx="14" cy="14" rx="8" ry="4" stroke="var(--color-energy-glow)" strokeWidth="0.6" opacity="0.4" transform="rotate(30 14 14)" />
    </svg>
  );
}
