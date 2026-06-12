export default function Logo({ size = 38, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} aria-label="Arangue">
      <rect x="45" y="6" width="9" height="27" rx="1" />
      <path fillRule="evenodd" d="M9 74 L49 19 L91 74 Z M31 70 L43 45 L55 70 Z" />
      <rect x="33" y="60" width="22" height="6" rx="1" />
      <rect x="14" y="79" width="72" height="6" rx="2" />
    </svg>
  );
}
