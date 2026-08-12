// FORTREX brand mark: a gold chess rook topped with a crown.
// Simplified line-art version of the official logo, for headers/footers.
export default function Logo({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="FORTREX"
    >
      {/* Crown */}
      <path d="M14 15 L17 9 L20 13 L24 7 L28 13 L31 9 L34 15 Z" fill="#D4AF37" />
      <rect x="14" y="15" width="20" height="2.6" rx="1" fill="#D4AF37" />
      <circle cx="17" cy="9" r="1.7" fill="#E5C04D" />
      <circle cx="24" cy="7" r="1.7" fill="#E5C04D" />
      <circle cx="31" cy="9" r="1.7" fill="#E5C04D" />
      {/* Rook crenellations */}
      <rect x="15" y="18.5" width="4" height="5" fill="#D4AF37" />
      <rect x="22" y="18.5" width="4" height="5" fill="#D4AF37" />
      <rect x="29" y="18.5" width="4" height="5" fill="#D4AF37" />
      {/* Rook body */}
      <rect x="16" y="23.5" width="16" height="9" fill="#D4AF37" />
      <rect x="22" y="26.5" width="4" height="4" rx="0.6" fill="#0A0E27" />
      {/* Rook base */}
      <rect x="14" y="32.5" width="20" height="4" fill="#D4AF37" />
      <rect x="11.5" y="36.5" width="25" height="5" rx="1.6" fill="#D4AF37" />
    </svg>
  );
}