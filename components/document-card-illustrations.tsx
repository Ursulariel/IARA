type PaletteName = "orange-light" | "orange-deep" | "blue-light" | "blue-deep"

type Palette = {
  pale: string
  soft: string
  mid: string
  strong: string
  dark: string
}

const palettes: Record<PaletteName, Palette> = {
  "orange-light": {
    pale: "#fff7ed",
    soft: "#fed7aa",
    mid: "#fb923c",
    strong: "#ea580c",
    dark: "#9a3412",
  },
  "orange-deep": {
    pale: "#ffedd5",
    soft: "#fdba74",
    mid: "#f97316",
    strong: "#c2410c",
    dark: "#7c2d12",
  },
  "blue-light": {
    pale: "#eff6ff",
    soft: "#bfdbfe",
    mid: "#60a5fa",
    strong: "#2563eb",
    dark: "#1e40af",
  },
  "blue-deep": {
    pale: "#dbeafe",
    soft: "#93c5fd",
    mid: "#3b82f6",
    strong: "#1d4ed8",
    dark: "#1e3a8a",
  },
}

type IllustrationProps = {
  className?: string
  palette: PaletteName
}

const paperShadow = {
  filter: "drop-shadow(6px 8px 5px rgb(15 23 42 / 0.18))",
}

const lowerLayerMotion =
  "transition-transform duration-300 ease-out group-hover/card:-translate-x-1 group-hover/card:translate-y-1 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-hover/card:translate-y-0"

const upperLayerMotion =
  "transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-hover/card:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-hover/card:translate-y-0"

export function TextDocumentIllustration({
  className,
  palette,
}: IllustrationProps) {
  const colors = palettes[palette]

  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g className={lowerLayerMotion}>
        <g opacity="0.7" transform="rotate(-6 112 82)">
          <rect x="57" y="18" width="112" height="124" rx="10" fill={colors.soft} />
        </g>
      </g>
      <g className={upperLayerMotion}>
        <g style={paperShadow}>
          <path
            d="M73 23h74l22 22v89a9 9 0 0 1-9 9H73a9 9 0 0 1-9-9V32a9 9 0 0 1 9-9Z"
            fill="#fff"
            stroke="#d4d4d4"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M147 23v17a6 6 0 0 0 6 6h16" fill={colors.pale} />
          <path d="M147 23v17a6 6 0 0 0 6 6h16" stroke="#d4d4d4" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="81" y="48" width="51" height="8" rx="4" fill={colors.strong} />
          <rect x="81" y="68" width="65" height="7" rx="3.5" fill="#e5e5e5" />
          <rect x="81" y="84" width="72" height="7" rx="3.5" fill="#e5e5e5" />
          <rect x="81" y="100" width="54" height="7" rx="3.5" fill="#e5e5e5" />
          <rect x="81" y="119" width="39" height="8" rx="4" fill={colors.soft} />
        </g>
        <g transform="rotate(-34 71 119)" style={paperShadow}>
          <path
            d="M43 114h47a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6H43l-12-7 12-7Z"
            fill={colors.strong}
          />
          <path d="m31 121 12-7v14l-12-7Z" fill={colors.soft} />
          <path d="m31 121 6-3.5v7L31 121Z" fill={colors.dark} />
          <path d="M83 114h7a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6h-7v-14Z" fill={colors.dark} />
        </g>
      </g>
    </svg>
  )
}

export function AnalyticsIllustration({
  className,
  palette,
}: IllustrationProps) {
  const colors = palettes[palette]

  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g className={lowerLayerMotion}>
        <g transform="rotate(-5 108 76)">
          <rect x="40" y="29" width="132" height="95" rx="10" fill={colors.soft} opacity="0.68" />
        </g>
      </g>
      <g className={upperLayerMotion}>
        <g style={paperShadow}>
          <rect x="52" y="24" width="138" height="98" rx="10" fill="#fff" stroke="#d4d4d4" strokeWidth="1.5" />
          <rect x="65" y="39" width="54" height="8" rx="4" fill="#e5e5e5" />
          <rect x="65" y="53" width="36" height="7" rx="3.5" fill="#e5e5e5" />
          <path
            d="M61 99c18-3 28-5 40-15 16-13 27-26 43-18 13 7 18 1 37-14v61H61V99Z"
            fill={colors.soft}
          />
          <path
            d="M61 107c20-5 31-4 44-15 17-14 28-20 43-15 13 5 19-6 33-12v48H61v-6Z"
            fill={colors.strong}
          />
        </g>
        <circle cx="173" cy="53" r="9" fill={colors.pale} />
        <path d="m169 53 3 3 6-7" stroke={colors.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function TableIllustration({
  className,
  palette,
}: IllustrationProps) {
  const colors = palettes[palette]

  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g className={lowerLayerMotion}>
        <g transform="rotate(-7 105 80)">
          <rect x="50" y="18" width="118" height="122" rx="10" fill={colors.soft} opacity="0.62" />
        </g>
      </g>
      <g className={upperLayerMotion}>
        <g style={paperShadow}>
          <rect x="69" y="21" width="115" height="124" rx="10" fill="#fff" stroke="#d4d4d4" strokeWidth="1.5" />
          <rect x="69" y="21" width="115" height="31" rx="10" fill={colors.soft} />
          <path d="M69 42h115v10H69z" fill={colors.soft} />
          <rect x="84" y="32" width="57" height="7" rx="3.5" fill={colors.strong} />
          <circle cx="170" cy="36" r="3" fill={colors.dark} />
          <rect x="83" y="67" width="87" height="57" rx="2" fill={colors.pale} stroke="#d4d4d4" />
          <path d="M83 81h87M83 96h87M83 110h87M105 67v57M138 67v57" stroke="#d4d4d4" strokeWidth="1.3" />
          <rect x="106" y="82" width="31" height="13" fill={colors.strong} />
          <rect x="139" y="97" width="30" height="12" fill={colors.mid} />
          <rect x="84" y="111" width="20" height="12" fill={colors.soft} />
        </g>
      </g>
    </svg>
  )
}

export function ClassroomIllustration({
  className,
  letter,
  palette,
}: IllustrationProps & { letter: string }) {
  const colors = palettes[palette]

  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g className={lowerLayerMotion}>
        <g transform="rotate(-5 103 80)">
          <rect x="31" y="28" width="144" height="108" rx="11" fill={colors.soft} opacity="0.68" />
        </g>
      </g>
      <g className={upperLayerMotion}>
        <g style={paperShadow}>
          <rect x="43" y="20" width="145" height="108" rx="11" fill="#fff" stroke="#d4d4d4" strokeWidth="1.5" />
          <rect x="54" y="32" width="123" height="61" rx="7" fill={colors.dark} />
          <path d="M64 45h30M64 53h19" stroke={colors.soft} strokeWidth="4" strokeLinecap="round" />
          <text
            x="119"
            y="77"
            fill={colors.pale}
            fontSize="34"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
          >
            {letter}
          </text>
          <path d="M61 100h109" stroke="#d4d4d4" strokeWidth="5" strokeLinecap="round" />
          <circle cx="75" cy="105" r="7" fill={colors.mid} />
          <path d="M63 122a12 12 0 0 1 24 0" fill={colors.soft} />
          <circle cx="106" cy="105" r="7" fill={colors.strong} />
          <path d="M94 122a12 12 0 0 1 24 0" fill={colors.mid} />
          <circle cx="137" cy="105" r="7" fill={colors.soft} />
          <path d="M125 122a12 12 0 0 1 24 0" fill={colors.pale} />
        </g>
      </g>
    </svg>
  )
}

export type { PaletteName }
