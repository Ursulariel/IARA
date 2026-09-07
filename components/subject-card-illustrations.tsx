type IllustrationProps = {
  className?: string
}

/**
 * Decorative illustration for the Língua Portuguesa subject card.
 * It is intentionally self-contained so the card does not need an image asset.
 */
export function PortugueseSubjectIllustration({
  className,
}: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 176 116"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(-7 92 61)">
        <rect
          x="61"
          y="18"
          width="77"
          height="89"
          rx="9"
          fill="#C4B5FD"
          opacity=".5"
        />
        <rect
          x="54"
          y="12"
          width="77"
          height="90"
          rx="9"
          fill="#FBCFE8"
          opacity=".74"
        />
        <rect x="48" y="7" width="77" height="91" rx="9" fill="#FFFDFB" />
        <rect
          x="48.75"
          y="7.75"
          width="75.5"
          height="89.5"
          rx="8.25"
          stroke="#F9A8D4"
          strokeWidth="1.5"
        />
        <rect x="57" y="17" width="23" height="18" rx="4" fill="#FDE68A" />
        <path
          d="M62 29h13M62 25h9M62 21h5"
          stroke="#A16207"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <rect x="87" y="18" width="28" height="7" rx="3.5" fill="#DDD6FE" />
        <rect x="87" y="30" width="20" height="4" rx="2" fill="#E5E7EB" />
        <rect x="57" y="44" width="58" height="9" rx="4.5" fill="#FCE7F3" />
        <path
          d="M62 48.5h23M91 48.5h17"
          stroke="#EC4899"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <rect x="57" y="59" width="58" height="9" rx="4.5" fill="#EDE9FE" />
        <path
          d="M62 63.5h14M82 63.5h26"
          stroke="#8B5CF6"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <rect x="57" y="74" width="58" height="9" rx="4.5" fill="#DBEAFE" />
        <path
          d="M62 78.5h28M96 78.5h12"
          stroke="#3B82F6"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </g>
      <circle cx="143" cy="26" r="12" fill="#F59E0B" opacity=".18" />
      <path
        d="M143 19v14M136 26h14"
        stroke="#F59E0B"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

/**
 * Decorative illustration for the Matemática subject card.
 */
export function MathSubjectIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 176 116"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(6 93 59)">
        <rect
          x="59"
          y="24"
          width="80"
          height="72"
          rx="10"
          fill="#86EFAC"
          opacity=".42"
        />
        <rect x="52" y="17" width="80" height="72" rx="10" fill="#FFF" />
        <rect
          x="52.75"
          y="17.75"
          width="78.5"
          height="70.5"
          rx="9.25"
          stroke="#A7F3D0"
          strokeWidth="1.5"
        />
        <rect x="53" y="18" width="78" height="8" rx="4" fill="#22C55E" />
        <text
          x="65"
          y="66"
          fill="#1F2937"
          fontFamily="Georgia, serif"
          fontSize="25"
          fontStyle="italic"
          fontWeight="600"
        >
          2 + 2
        </text>
        <path
          d="M72 76.5h44"
          stroke="#E5E7EB"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
      <circle cx="143" cy="82" r="17" fill="#60A5FA" opacity=".24" />
      <path
        d="m135 82 5.5 5.5L152 75"
        stroke="#2563EB"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  )
}

/**
 * Decorative illustration for the Produção textual subject card.
 */
export function WritingSubjectIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 176 116"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(-4 89 57)">
        <rect
          x="60"
          y="15"
          width="73"
          height="88"
          rx="10"
          fill="#FCD34D"
          opacity=".28"
        />
        <path
          d="M54 13.5c0-4.1 3.4-7.5 7.5-7.5h53l18 18v70.5c0 4.1-3.4 7.5-7.5 7.5h-63.5c-4.1 0-7.5-3.4-7.5-7.5v-81.5Z"
          fill="#FFF"
        />
        <path d="M115 6v12.5c0 3 2.5 5.5 5.5 5.5H133" fill="#FEF3C7" />
        <path
          d="M54 13.5c0-4.1 3.4-7.5 7.5-7.5h53l18 18v70.5c0 4.1-3.4 7.5-7.5 7.5h-63.5c-4.1 0-7.5-3.4-7.5-7.5v-81.5Z"
          stroke="#F59E0B"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M115 6v12.5c0 3 2.5 5.5 5.5 5.5H133"
          stroke="#F59E0B"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M66 34h51M66 45h51M66 56h40M66 67h44M66 78h28"
          stroke="#CBD5E1"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        <path
          d="M62 29v57"
          stroke="#FCA5A5"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </g>
      <g transform="rotate(-42 123 77)">
        <rect x="116" y="48" width="14" height="54" rx="5" fill="#F59E0B" />
        <rect x="116" y="53" width="14" height="8" fill="#FCD34D" />
        <path d="m116 102 7 9 7-9h-14Z" fill="#7C2D12" />
        <path d="m120.5 106 2.5 5 2.5-5h-5Z" fill="#1F2937" />
      </g>
    </svg>
  )
}
