type ClassroomIllustrationProps = {
  className?: string
  accent: string
  softAccent: string
}

/** Decorative class card with three students and classroom supplies. */
export function ClassroomIllustration({
  className,
  accent,
  softAccent,
}: ClassroomIllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 180 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="37"
        y="23"
        width="102"
        height="94"
        rx="18"
        fill={softAccent}
        opacity=".56"
        transform="rotate(5 37 23)"
      />
      <rect x="31" y="18" width="104" height="96" rx="18" fill="#FFFFFF" />
      <rect
        x="31.75"
        y="18.75"
        width="102.5"
        height="94.5"
        rx="17.25"
        stroke={accent}
        strokeOpacity=".24"
        strokeWidth="1.5"
      />
      <rect x="45" y="32" width="76" height="27" rx="9" fill={softAccent} />
      <path
        d="M53 42h39M53 49h25"
        stroke={accent}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <circle cx="107" cy="45.5" r="7" fill={accent} opacity=".84" />
      <path
        d="m104.5 45.5 1.8 1.9 3.8-4.1"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M49 88c0-8 6.5-14.5 14.5-14.5S78 80 78 88v9H49v-9ZM75 88c0-8 6.5-14.5 14.5-14.5S104 80 104 88v9H75v-9ZM101 88c0-8 6.5-14.5 14.5-14.5S130 80 130 88v9h-29v-9Z"
        fill={accent}
        opacity=".16"
      />
      <circle cx="63.5" cy="76" r="8" fill="#F6C28B" />
      <path
        d="M56 75c0-5.3 3.4-8.5 8-8.5 4.7 0 7.5 3.3 7.5 7.5-3.1-1.4-6.8-1.7-10.3-.8L56 75Z"
        fill="#334155"
      />
      <path d="M56 91c2.2-5.1 12.8-5.1 15 0v6H56v-6Z" fill={accent} />
      <circle cx="89.5" cy="76" r="8" fill="#E9B981" />
      <path
        d="M82 73.5c1.2-5 10.6-7.8 14.7-1.4l.3 5.4c-4.6-2.2-10.7-2.5-15-.7v-3.3Z"
        fill="#7C3F24"
      />
      <path d="M82 91c2.2-5.1 12.8-5.1 15 0v6H82v-6Z" fill="#F4B740" />
      <circle cx="115.5" cy="76" r="8" fill="#C9855E" />
      <path
        d="M107.5 75.4c0-5.6 3.2-9.4 8.1-9.4 5.4 0 8.2 4.5 8.2 9.1-5-2.2-10.9-2.1-16.3.3v0Z"
        fill="#27364A"
      />
      <path d="M108 91c2.2-5.1 12.8-5.1 15 0v6h-15v-6Z" fill="#5B72DC" />
      <path
        d="M45 105h76"
        stroke="#E5E7EB"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <rect x="139" y="74" width="19" height="35" rx="6" fill={accent} />
      <rect
        x="143"
        y="79"
        width="11"
        height="15"
        rx="3"
        fill="#FFFFFF"
        opacity=".92"
      />
      <path
        d="M146 99h6M146 103h5"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="m140 112 14-41"
        stroke="#F4B740"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path d="m153.4 70.8 2.3-6.5 3.4 5.9-5.7.6Z" fill="#27364A" />
      <circle cx="26" cy="106" r="11" fill={accent} opacity=".17" />
      <circle cx="146" cy="33" r="8" fill="#F4B740" opacity=".72" />
    </svg>
  )
}
