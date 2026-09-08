export type ActivitySubject = "Língua Portuguesa" | "Redação" | "Matemática"

export type ActivityTemplateId =
  | "categorization"
  | "summary"
  | "mixed-review"
  | "matching"
  | "fill-blank"
  | "multiple-choice"
  | "word-search"
  | "story-map"

export type ActivityWorldTheme = {
  primary: string
  secondary: string
  accent: string
  surface: string
  paper: string
  ink: string
  line: string
}

type ActivityWorldSpec = {
  id: string
  name: string
  cardTint: string
  frameRadius: number
  tilt: number
  shiftX: number
  shiftY: number
  scale: number
}

const activityWorlds = {
  "Língua Portuguesa": [
    {
      id: "lp-feira-alfabeto",
      name: "Feira do alfabeto",
      cardTint: "#F4E9FF",
      frameRadius: 24,
      tilt: -1.3,
      shiftX: -2,
      shiftY: 1,
      scale: 0.92,
    },
    {
      id: "lp-oficina-silabas",
      name: "Oficina de sílabas",
      cardTint: "#EEE8FF",
      frameRadius: 18,
      tilt: 1.1,
      shiftX: 2,
      shiftY: 0,
      scale: 0.93,
    },
    {
      id: "lp-estudio-quadrinhos",
      name: "Estúdio de quadrinhos",
      cardTint: "#F7EAF4",
      frameRadius: 14,
      tilt: -0.7,
      shiftX: 1,
      shiftY: 2,
      scale: 0.91,
    },
    {
      id: "lp-expedicao-texto",
      name: "Expedição do texto",
      cardTint: "#E8F0FF",
      frameRadius: 28,
      tilt: 1.4,
      shiftX: -1,
      shiftY: -1,
      scale: 0.92,
    },
    {
      id: "lp-teatro-narrativas",
      name: "Teatro de narrativas",
      cardTint: "#FFF0E5",
      frameRadius: 20,
      tilt: -1,
      shiftX: 2,
      shiftY: 1,
      scale: 0.94,
    },
    {
      id: "lp-biblioteca-generos",
      name: "Biblioteca de gêneros",
      cardTint: "#F2EADD",
      frameRadius: 12,
      tilt: 0.8,
      shiftX: -2,
      shiftY: 2,
      scale: 0.92,
    },
    {
      id: "lp-laboratorio-sentidos",
      name: "Laboratório de sentidos",
      cardTint: "#E6F3FF",
      frameRadius: 26,
      tilt: -1.5,
      shiftX: 1,
      shiftY: -1,
      scale: 0.93,
    },
    {
      id: "lp-estudio-argumentacao",
      name: "Estúdio de argumentação",
      cardTint: "#FBECDD",
      frameRadius: 16,
      tilt: 1.5,
      shiftX: -1,
      shiftY: 1,
      scale: 0.91,
    },
    {
      id: "lp-constelacao-literaria",
      name: "Constelação literária",
      cardTint: "#ECEBFF",
      frameRadius: 30,
      tilt: -0.4,
      shiftX: 2,
      shiftY: -1,
      scale: 0.92,
    },
  ],
  Matemática: [
    {
      id: "mat-jardim-contagem",
      name: "Jardim da contagem",
      cardTint: "#E3F7E8",
      frameRadius: 27,
      tilt: 1.2,
      shiftX: 2,
      shiftY: 1,
      scale: 0.92,
    },
    {
      id: "mat-mercado-operacoes",
      name: "Mercado das operações",
      cardTint: "#FFF1D4",
      frameRadius: 17,
      tilt: -1.2,
      shiftX: -2,
      shiftY: 0,
      scale: 0.93,
    },
    {
      id: "mat-fabrica-multiplicacao",
      name: "Fábrica da multiplicação",
      cardTint: "#E0F4E6",
      frameRadius: 11,
      tilt: 0.6,
      shiftX: 1,
      shiftY: -1,
      scale: 0.91,
    },
    {
      id: "mat-cozinha-fracoes",
      name: "Cozinha das frações",
      cardTint: "#FFF0DE",
      frameRadius: 23,
      tilt: -1.4,
      shiftX: 2,
      shiftY: 2,
      scale: 0.92,
    },
    {
      id: "mat-cidade-geometrica",
      name: "Cidade geométrica",
      cardTint: "#E6F2EA",
      frameRadius: 13,
      tilt: 1.4,
      shiftX: -1,
      shiftY: 0,
      scale: 0.94,
    },
    {
      id: "mat-cartografia-razoes",
      name: "Cartografia das razões",
      cardTint: "#E1EFF5",
      frameRadius: 25,
      tilt: -0.8,
      shiftX: -2,
      shiftY: 1,
      scale: 0.92,
    },
    {
      id: "mat-oficina-algebra",
      name: "Oficina de álgebra",
      cardTint: "#F1E8D8",
      frameRadius: 15,
      tilt: 1.6,
      shiftX: 1,
      shiftY: 1,
      scale: 0.93,
    },
    {
      id: "mat-central-funcoes",
      name: "Central de funções",
      cardTint: "#DFF3F0",
      frameRadius: 10,
      tilt: -1.1,
      shiftX: 2,
      shiftY: -1,
      scale: 0.91,
    },
    {
      id: "mat-observatorio-dados",
      name: "Observatório de dados",
      cardTint: "#E4EBF7",
      frameRadius: 29,
      tilt: 0.5,
      shiftX: -1,
      shiftY: 2,
      scale: 0.92,
    },
  ],
  Redação: [
    {
      id: "red-jardim-ideias",
      name: "Jardim de ideias",
      cardTint: "#EAF7E8",
      frameRadius: 29,
      tilt: -1.1,
      shiftX: 1,
      shiftY: 2,
      scale: 0.92,
    },
    {
      id: "red-correio-frases",
      name: "Correio das frases",
      cardTint: "#FFF0E8",
      frameRadius: 20,
      tilt: 1.3,
      shiftX: -2,
      shiftY: 1,
      scale: 0.93,
    },
    {
      id: "red-cinema-historias",
      name: "Cinema de histórias",
      cardTint: "#E6EEF9",
      frameRadius: 12,
      tilt: -0.5,
      shiftX: 2,
      shiftY: -1,
      scale: 0.91,
    },
    {
      id: "red-obra-paragrafo",
      name: "Obra do parágrafo",
      cardTint: "#F2E8DF",
      frameRadius: 15,
      tilt: 1.5,
      shiftX: -1,
      shiftY: 0,
      scale: 0.92,
    },
    {
      id: "red-cabine-cronicas",
      name: "Cabine de crônicas",
      cardTint: "#E5F2FA",
      frameRadius: 24,
      tilt: -1.4,
      shiftX: 1,
      shiftY: 1,
      scale: 0.94,
    },
    {
      id: "red-redacao-resenhas",
      name: "Redação de resenhas",
      cardTint: "#FFF0E5",
      frameRadius: 18,
      tilt: 0.9,
      shiftX: -2,
      shiftY: 2,
      scale: 0.92,
    },
    {
      id: "red-forum-opiniao",
      name: "Fórum de opinião",
      cardTint: "#F1E8FF",
      frameRadius: 22,
      tilt: -1.6,
      shiftX: 2,
      shiftY: 0,
      scale: 0.93,
    },
    {
      id: "red-oficina-editorial",
      name: "Oficina editorial",
      cardTint: "#E4EEF9",
      frameRadius: 14,
      tilt: 1.1,
      shiftX: -1,
      shiftY: -1,
      scale: 0.91,
    },
    {
      id: "red-laboratorio-ensaio",
      name: "Laboratório de ensaio",
      cardTint: "#E8F2EF",
      frameRadius: 27,
      tilt: -0.6,
      shiftX: 1,
      shiftY: 1,
      scale: 0.92,
    },
  ],
} as const satisfies Record<ActivitySubject, readonly ActivityWorldSpec[]>

export type ActivityWorld =
  (typeof activityWorlds)[keyof typeof activityWorlds][number]

function getYearIndex(schoolYear: string | null) {
  const year = Number(schoolYear)

  return Number.isInteger(year) && year >= 1 && year <= 9 ? year - 1 : 0
}

export function getActivityWorld(
  subject: ActivitySubject,
  schoolYear: string | null
): ActivityWorld {
  return activityWorlds[subject][getYearIndex(schoolYear)]
}

function mixHexColors(base: string, tint: string, tintWeight = 0.36) {
  const channels = [1, 3, 5].map((start) => {
    const baseChannel = Number.parseInt(base.slice(start, start + 2), 16)
    const tintChannel = Number.parseInt(tint.slice(start, start + 2), 16)

    return Math.round(baseChannel * (1 - tintWeight) + tintChannel * tintWeight)
      .toString(16)
      .padStart(2, "0")
  })

  return `#${channels.join("")}`
}

export function getActivityCardBackground(
  subject: ActivitySubject,
  schoolYear: string | null,
  templateBackground: string
) {
  return mixHexColors(
    templateBackground,
    getActivityWorld(subject, schoolYear).cardTint
  )
}

function WorldFrame({
  world,
  theme,
  children,
}: {
  world: ActivityWorld
  theme: ActivityWorldTheme
  children: ReactNode
}) {
  return (
    <g data-world={world.id}>
      <rect
        x="4"
        y="4"
        width="172"
        height="142"
        rx={world.frameRadius}
        fill={theme.paper}
        fillOpacity="0.5"
      />
      {children}
    </g>
  )
}

function PortugueseWorld({
  world,
  theme,
}: {
  world: ActivityWorld
  theme: ActivityWorldTheme
}) {
  switch (world.id) {
    case "lp-feira-alfabeto":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M12 26h156l-9-16H21Z"
            fill={theme.secondary}
            fillOpacity="0.34"
          />
          {[30, 60, 90, 120, 150].map((x, index) => (
            <path
              key={x}
              d={`M${x - 10} 10h20l-4 16H${x - 6}Z`}
              fill={index % 2 ? theme.accent : theme.primary}
              fillOpacity="0.25"
            />
          ))}
          <path
            d="M19 124h39v15H19zm103 0h39v15h-39z"
            fill={theme.primary}
            fillOpacity="0.17"
          />
          <text
            x="32"
            y="136"
            fill={theme.ink}
            fontSize="9"
            fontWeight="800"
            opacity="0.32"
          >
            A
          </text>
          <text
            x="140"
            y="136"
            fill={theme.ink}
            fontSize="9"
            fontWeight="800"
            opacity="0.32"
          >
            B
          </text>
        </WorldFrame>
      )
    case "lp-oficina-silabas":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M10 126h160"
            stroke={theme.primary}
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.16"
          />
          {[28, 60, 92, 124, 156].map((x) => (
            <circle
              key={x}
              cx={x}
              cy="126"
              r="5"
              fill={theme.accent}
              fillOpacity="0.34"
            />
          ))}
          <circle
            cx="28"
            cy="28"
            r="17"
            fill="none"
            stroke={theme.secondary}
            strokeWidth="7"
            opacity="0.22"
          />
          <path
            d="M28 6v9m0 26v9M6 28h9m26 0h9M13 13l7 7m16 16 7 7m0-30-7 7M20 36l-7 7"
            stroke={theme.primary}
            strokeWidth="3"
            opacity="0.22"
          />
          <rect
            x="132"
            y="14"
            width="30"
            height="19"
            rx="6"
            fill={theme.accent}
            fillOpacity="0.26"
          />
          <text
            x="147"
            y="27"
            textAnchor="middle"
            fill={theme.ink}
            fontSize="8"
            fontWeight="800"
            opacity="0.38"
          >
            PA
          </text>
        </WorldFrame>
      )
    case "lp-estudio-quadrinhos":
      return (
        <WorldFrame world={world} theme={theme}>
          <rect
            x="10"
            y="10"
            width="48"
            height="34"
            rx="7"
            fill={theme.secondary}
            fillOpacity="0.22"
          />
          <rect
            x="122"
            y="10"
            width="48"
            height="34"
            rx="7"
            fill={theme.accent}
            fillOpacity="0.2"
          />
          <rect
            x="10"
            y="106"
            width="48"
            height="34"
            rx="7"
            fill={theme.accent}
            fillOpacity="0.18"
          />
          <rect
            x="122"
            y="106"
            width="48"
            height="34"
            rx="7"
            fill={theme.primary}
            fillOpacity="0.18"
          />
          <path
            d="M22 18h24a7 7 0 0 1 7 7v3a7 7 0 0 1-7 7H34l-7 6 2-6h-7a7 7 0 0 1-7-7v-3a7 7 0 0 1 7-7Z"
            fill={theme.paper}
            fillOpacity="0.72"
          />
          <path
            d="m132 127 10-8 11 8"
            stroke={theme.ink}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
        </WorldFrame>
      )
    case "lp-expedicao-texto":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M14 128c31-38 54 1 76-35s49-24 76-70"
            stroke={theme.primary}
            strokeWidth="4"
            strokeDasharray="5 7"
            strokeLinecap="round"
            opacity="0.24"
          />
          <circle
            cx="22"
            cy="120"
            r="8"
            fill={theme.accent}
            fillOpacity="0.48"
          />
          <circle
            cx="158"
            cy="24"
            r="8"
            fill={theme.secondary}
            fillOpacity="0.48"
          />
          <circle
            cx="145"
            cy="122"
            r="14"
            fill="none"
            stroke={theme.primary}
            strokeWidth="5"
            opacity="0.2"
          />
          <path
            d="m155 132 11 11"
            stroke={theme.primary}
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.2"
          />
        </WorldFrame>
      )
    case "lp-teatro-narrativas":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M7 7h38c1 25-6 44-23 59C13 50 8 31 7 7Zm166 0h-38c-1 25 6 44 23 59 9-16 14-35 15-59Z"
            fill={theme.primary}
            fillOpacity="0.23"
          />
          <path
            d="M12 133h156"
            stroke={theme.accent}
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.2"
          />
          <circle
            cx="25"
            cy="116"
            r="7"
            fill={theme.secondary}
            fillOpacity="0.34"
          />
          <circle
            cx="155"
            cy="116"
            r="7"
            fill={theme.secondary}
            fillOpacity="0.34"
          />
        </WorldFrame>
      )
    case "lp-biblioteca-generos":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M9 39h162M9 112h162"
            stroke={theme.ink}
            strokeWidth="5"
            opacity="0.12"
          />
          {[14, 28, 44, 138, 153].map((x, index) => (
            <rect
              key={x}
              x={x}
              y={index < 3 ? 12 : 84}
              width={index % 2 ? 10 : 13}
              height={index % 2 ? 25 : 27}
              rx="3"
              fill={index % 2 ? theme.accent : theme.primary}
              fillOpacity="0.25"
            />
          ))}
          <path
            d="m160 84 7 28"
            stroke={theme.secondary}
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.3"
          />
        </WorldFrame>
      )
    case "lp-laboratorio-sentidos":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="m18 22 22 35H6Z"
            fill={theme.paper}
            stroke={theme.primary}
            strokeWidth="3"
            opacity="0.3"
          />
          <path
            d="m40 39 31-17M40 43l35 1M40 47l31 20"
            stroke={theme.accent}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.24"
          />
          <circle
            cx="150"
            cy="116"
            r="17"
            fill="none"
            stroke={theme.secondary}
            strokeWidth="7"
            opacity="0.25"
          />
          <circle
            cx="150"
            cy="116"
            r="7"
            fill={theme.primary}
            fillOpacity="0.2"
          />
          <path
            d="M12 129h71"
            stroke={theme.primary}
            strokeWidth="3"
            strokeDasharray="8 5"
            opacity="0.2"
          />
        </WorldFrame>
      )
    case "lp-estudio-argumentacao":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M18 118h45l-7 25H25Z"
            fill={theme.primary}
            fillOpacity="0.2"
          />
          <path
            d="M39 118V89m0 0c0-10 13-10 13 0s-13 10-13 0Z"
            stroke={theme.primary}
            strokeWidth="4"
            opacity="0.28"
          />
          <rect
            x="121"
            y="13"
            width="43"
            height="25"
            rx="8"
            fill={theme.accent}
            fillOpacity="0.25"
          />
          <rect
            x="130"
            y="111"
            width="35"
            height="23"
            rx="7"
            fill={theme.secondary}
            fillOpacity="0.25"
          />
          <path
            d="M128 24h28m-19 98h20"
            stroke={theme.ink}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.2"
          />
        </WorldFrame>
      )
    case "lp-constelacao-literaria":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M19 35 51 16l36 18 38-21 35 30M20 115l31 20 39-16 36 18 34-25"
            stroke={theme.primary}
            strokeWidth="2"
            opacity="0.2"
          />
          {[
            [19, 35],
            [51, 16],
            [87, 34],
            [125, 13],
            [160, 43],
            [20, 115],
            [51, 135],
            [90, 119],
            [126, 137],
            [160, 112],
          ].map(([x, y], index) => (
            <path
              key={`${x}-${y}`}
              d={`M${x} ${y - 5}l1.5 3.5 4 .5-3 2.7.8 4-3.3-2-3.3 2 .8-4-3-2.7 4-.5Z`}
              fill={index % 3 === 0 ? theme.accent : theme.secondary}
              fillOpacity="0.38"
            />
          ))}
        </WorldFrame>
      )
    default:
      return null
  }
}

function MathWorld({
  world,
  theme,
}: {
  world: ActivityWorld
  theme: ActivityWorldTheme
}) {
  switch (world.id) {
    case "mat-jardim-contagem":
      return (
        <WorldFrame world={world} theme={theme}>
          {[22, 48, 136, 159].map((x, index) => (
            <g key={x}>
              <path
                d={`M${x} 136V${100 + index * 4}`}
                stroke={theme.primary}
                strokeWidth="4"
                opacity="0.24"
              />
              <ellipse
                cx={x - 5}
                cy={108 + index * 3}
                rx="7"
                ry="4"
                transform={`rotate(-25 ${x - 5} ${108 + index * 3})`}
                fill={theme.secondary}
                fillOpacity="0.32"
              />
              <circle
                cx={x}
                cy={95 + index * 4}
                r={5 + (index % 2) * 2}
                fill={theme.accent}
                fillOpacity="0.4"
              />
            </g>
          ))}
          <path
            d="M8 137h164"
            stroke={theme.primary}
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.15"
          />
        </WorldFrame>
      )
    case "mat-mercado-operacoes":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M9 26h162l-8-17H17Z"
            fill={theme.accent}
            fillOpacity="0.22"
          />
          {[24, 36, 145, 157].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy={index < 2 ? 122 : 42}
              r="8"
              fill={index % 2 ? theme.secondary : theme.primary}
              fillOpacity="0.27"
            />
          ))}
          <path
            d="M16 110h39l-5 26H22Zm111-73h37l-5 26h-26Z"
            fill={theme.primary}
            fillOpacity="0.16"
          />
          <text
            x="37"
            y="130"
            textAnchor="middle"
            fill={theme.ink}
            fontSize="9"
            fontWeight="800"
            opacity="0.3"
          >
            +
          </text>
          <text
            x="146"
            y="55"
            textAnchor="middle"
            fill={theme.ink}
            fontSize="9"
            fontWeight="800"
            opacity="0.3"
          >
            =
          </text>
        </WorldFrame>
      )
    case "mat-fabrica-multiplicacao":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M8 126h164"
            stroke={theme.primary}
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.16"
          />
          {[21, 54, 87, 120, 153].map((x) => (
            <circle
              key={x}
              cx={x}
              cy="126"
              r="5"
              fill={theme.paper}
              stroke={theme.secondary}
              strokeWidth="2"
              opacity="0.7"
            />
          ))}
          {[15, 32, 49].map((x, index) => (
            <rect
              key={x}
              x={x}
              y={90 - index * 4}
              width="14"
              height="14"
              rx="3"
              fill={index === 1 ? theme.accent : theme.secondary}
              fillOpacity="0.34"
            />
          ))}
          <circle
            cx="151"
            cy="31"
            r="17"
            fill="none"
            stroke={theme.primary}
            strokeWidth="7"
            opacity="0.2"
          />
          <path
            d="M151 7v10m0 28v10m-24-24h10m28 0h10"
            stroke={theme.primary}
            strokeWidth="3"
            opacity="0.2"
          />
        </WorldFrame>
      )
    case "mat-cozinha-fracoes":
      return (
        <WorldFrame world={world} theme={theme}>
          <circle
            cx="30"
            cy="31"
            r="20"
            fill={theme.paper}
            stroke={theme.primary}
            strokeWidth="3"
            opacity="0.42"
          />
          <path
            d="M30 31V11a20 20 0 0 1 20 20Z"
            fill={theme.accent}
            fillOpacity="0.42"
          />
          <path
            d="M133 114h28l-4 25h-20Z"
            fill={theme.secondary}
            fillOpacity="0.23"
          />
          <path
            d="M137 122h20M140 130h16"
            stroke={theme.primary}
            strokeWidth="2"
            opacity="0.28"
          />
          <path
            d="M15 131c24-11 43-5 59 8"
            stroke={theme.accent}
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.18"
          />
        </WorldFrame>
      )
    case "mat-cidade-geometrica":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M7 139V99h28v40m3 0V77h31v62m42 0V91h27v48m4 0V61h31v78Z"
            fill={theme.primary}
            fillOpacity="0.16"
          />
          <path
            d="m38 77 15-19 16 19m73-16 15-18 16 18"
            fill={theme.accent}
            fillOpacity="0.27"
          />
          {[17, 27, 48, 59, 120, 129, 151, 162].map((x, index) => (
            <rect
              key={x}
              x={x}
              y={index < 2 ? 111 : index < 4 ? 91 : index < 6 ? 105 : 78}
              width="6"
              height="8"
              rx="1"
              fill={theme.paper}
              fillOpacity="0.8"
            />
          ))}
        </WorldFrame>
      )
    case "mat-cartografia-razoes":
      return (
        <WorldFrame world={world} theme={theme}>
          {[18, 42, 138, 162].map((x) => (
            <path
              key={x}
              d={`M${x} 7v136`}
              stroke={theme.primary}
              strokeWidth="1"
              opacity="0.14"
            />
          ))}
          {[18, 42, 114, 138].map((y) => (
            <path
              key={y}
              d={`M7 ${y}h166`}
              stroke={theme.primary}
              strokeWidth="1"
              opacity="0.14"
            />
          ))}
          <path
            d="M13 128 47 96l31 13 42-55 45-28"
            stroke={theme.secondary}
            strokeWidth="4"
            strokeDasharray="7 5"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d="M159 20c8 0 12 8 8 14l-8 12-8-12c-4-6 0-14 8-14Z"
            fill={theme.accent}
            fillOpacity="0.4"
          />
        </WorldFrame>
      )
    case "mat-oficina-algebra":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M10 123h57l-8 20H18Zm104-99h56l-8 20h-40Z"
            fill={theme.accent}
            fillOpacity="0.18"
          />
          <path
            d="M22 113h34m85-79h18"
            stroke={theme.ink}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.23"
          />
          <path
            d="M145 105V73m-25 32h50m-40 0 7 21h16l7-21"
            stroke={theme.primary}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
          <rect
            x="135"
            y="84"
            width="20"
            height="16"
            rx="5"
            fill={theme.secondary}
            fillOpacity="0.35"
          />
          <text
            x="145"
            y="95"
            textAnchor="middle"
            fill={theme.ink}
            fontSize="8"
            fontWeight="800"
            opacity="0.42"
          >
            x
          </text>
        </WorldFrame>
      )
    case "mat-central-funcoes":
      return (
        <WorldFrame world={world} theme={theme}>
          <rect
            x="8"
            y="18"
            width="49"
            height="29"
            rx="7"
            fill={theme.secondary}
            fillOpacity="0.22"
          />
          <rect
            x="123"
            y="103"
            width="49"
            height="29"
            rx="7"
            fill={theme.accent}
            fillOpacity="0.2"
          />
          <path
            d="M58 33h25l8 10 8-10h23M58 117h25l8-10 8 10h23"
            stroke={theme.primary}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.27"
          />
          <path
            d="M130 79h35M136 91V57m4 24 7-8 7 2 8-15"
            stroke={theme.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
        </WorldFrame>
      )
    case "mat-observatorio-dados":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M12 133h52m-44 0v-19h9v19m6 0v-31h9v31m6 0V89h9v44"
            stroke={theme.primary}
            strokeWidth="3"
            opacity="0.24"
          />
          <path
            d="M135 105 154 69m-13 8 22 12"
            stroke={theme.primary}
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.22"
          />
          <ellipse
            cx="157"
            cy="67"
            rx="17"
            ry="9"
            transform="rotate(-62 157 67)"
            fill={theme.secondary}
            fillOpacity="0.28"
          />
          {[
            [19, 24],
            [42, 15],
            [147, 24],
            [165, 36],
            [122, 18],
          ].map(([x, y], index) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={3 + (index % 2)}
              fill={index % 2 ? theme.accent : theme.primary}
              fillOpacity="0.36"
            />
          ))}
        </WorldFrame>
      )
    default:
      return null
  }
}

function WritingWorld({
  world,
  theme,
}: {
  world: ActivityWorld
  theme: ActivityWorldTheme
}) {
  switch (world.id) {
    case "red-jardim-ideias":
      return (
        <WorldFrame world={world} theme={theme}>
          {[24, 52, 132, 158].map((x, index) => (
            <g key={x}>
              <path
                d={`M${x} 139V${109 - index * 3}`}
                stroke={theme.primary}
                strokeWidth="4"
                opacity="0.22"
              />
              <path
                d={`M${x} ${121 - index * 2}c${index % 2 ? 10 : -10}-10 ${index % 2 ? 14 : -14} 2 0 8`}
                fill={theme.secondary}
                fillOpacity="0.3"
              />
              <circle
                cx={x}
                cy={104 - index * 3}
                r="7"
                fill={theme.accent}
                fillOpacity="0.34"
              />
            </g>
          ))}
          <rect
            x="13"
            y="13"
            width="38"
            height="25"
            rx="9"
            fill={theme.paper}
            fillOpacity="0.72"
          />
          <path
            d="M22 24h20M27 31h10"
            stroke={theme.primary}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.25"
          />
        </WorldFrame>
      )
    case "red-correio-frases":
      return (
        <WorldFrame world={world} theme={theme}>
          <rect
            x="10"
            y="15"
            width="48"
            height="33"
            rx="7"
            fill={theme.paper}
            stroke={theme.secondary}
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d="m12 18 22 18 22-18"
            stroke={theme.primary}
            strokeWidth="3"
            opacity="0.26"
          />
          <rect
            x="122"
            y="104"
            width="48"
            height="33"
            rx="7"
            fill={theme.paper}
            stroke={theme.accent}
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d="m124 107 22 18 22-18M56 42c26 12 35 17 47 35s23 22 43 27"
            stroke={theme.primary}
            strokeWidth="3"
            strokeDasharray="5 6"
            strokeLinecap="round"
            opacity="0.22"
          />
        </WorldFrame>
      )
    case "red-cinema-historias":
      return (
        <WorldFrame world={world} theme={theme}>
          <rect
            x="8"
            y="105"
            width="48"
            height="34"
            rx="6"
            fill={theme.secondary}
            fillOpacity="0.18"
          />
          <rect
            x="66"
            y="105"
            width="48"
            height="34"
            rx="6"
            fill={theme.accent}
            fillOpacity="0.17"
          />
          <rect
            x="124"
            y="105"
            width="48"
            height="34"
            rx="6"
            fill={theme.primary}
            fillOpacity="0.16"
          />
          <path
            d="M12 18h50l-6 18H6Zm0 0 9 18m11-18 9 18m11-18 9 18"
            stroke={theme.primary}
            strokeWidth="4"
            strokeLinejoin="round"
            opacity="0.24"
          />
          <circle
            cx="32"
            cy="122"
            r="7"
            fill={theme.paper}
            fillOpacity="0.75"
          />
          <path d="m84 114 15 8-15 8Z" fill={theme.paper} fillOpacity="0.75" />
          <path
            d="M136 129h25"
            stroke={theme.paper}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
        </WorldFrame>
      )
    case "red-obra-paragrafo":
      return (
        <WorldFrame world={world} theme={theme}>
          {[15, 51, 123, 143].map((x, index) => (
            <rect
              key={x}
              x={x}
              y={index < 2 ? 113 : 122}
              width={index % 2 ? 32 : 28}
              height="16"
              rx="3"
              fill={index % 2 ? theme.accent : theme.secondary}
              fillOpacity="0.25"
            />
          ))}
          <path
            d="M147 11v89m0-89H87m60 0 18 15m-18-15-17 15"
            stroke={theme.primary}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.24"
          />
          <path
            d="M87 11v13"
            stroke={theme.primary}
            strokeWidth="3"
            opacity="0.24"
          />
          <rect
            x="78"
            y="24"
            width="18"
            height="12"
            rx="3"
            fill={theme.accent}
            fillOpacity="0.35"
          />
        </WorldFrame>
      )
    case "red-cabine-cronicas":
      return (
        <WorldFrame world={world} theme={theme}>
          <rect
            x="7"
            y="13"
            width="54"
            height="43"
            rx="8"
            fill={theme.paper}
            stroke={theme.secondary}
            strokeWidth="3"
            opacity="0.58"
          />
          <path
            d="M34 14v41M8 36h52m4 99h104M76 129v12m28-12v12m28-12v12"
            stroke={theme.primary}
            strokeWidth="2.5"
            opacity="0.2"
          />
          <path
            d="M14 33 25 24l9 9 12-13 13 13"
            fill={theme.secondary}
            fillOpacity="0.25"
          />
          <circle
            cx="151"
            cy="30"
            r="13"
            fill="none"
            stroke={theme.primary}
            strokeWidth="5"
            opacity="0.22"
          />
          <circle
            cx="151"
            cy="30"
            r="5"
            fill={theme.accent}
            fillOpacity="0.35"
          />
        </WorldFrame>
      )
    case "red-redacao-resenhas":
      return (
        <WorldFrame world={world} theme={theme}>
          <rect
            x="9"
            y="9"
            width="53"
            height="41"
            rx="7"
            fill={theme.paper}
            stroke={theme.primary}
            strokeWidth="2"
            opacity="0.58"
          />
          <path
            d="M16 18h39M16 26h25M16 34h34M16 42h21"
            stroke={theme.primary}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.22"
          />
          {[119, 132, 145, 158].map((x, index) => (
            <path
              key={x}
              d={`M${x} 121l3 6 7 1-5 5 1 7-7-3-6 3 1-7-5-5 7-1Z`}
              fill={index < 3 ? theme.accent : theme.line}
              fillOpacity="0.35"
            />
          ))}
          <path
            d="m28 129 19-24 7 6-19 24-10 4Z"
            fill={theme.secondary}
            fillOpacity="0.3"
          />
        </WorldFrame>
      )
    case "red-forum-opiniao":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M11 113h46l-6 29H18Z"
            fill={theme.primary}
            fillOpacity="0.19"
          />
          <path
            d="M34 113V82m0 0c0-9 12-9 12 0s-12 9-12 0Z"
            stroke={theme.primary}
            strokeWidth="4"
            opacity="0.25"
          />
          <path
            d="M126 12h35a9 9 0 0 1 9 9v9a9 9 0 0 1-9 9h-17l-9 8 2-8h-11a9 9 0 0 1-9-9v-9a9 9 0 0 1 9-9Z"
            fill={theme.secondary}
            fillOpacity="0.22"
          />
          <rect
            x="124"
            y="113"
            width="42"
            height="24"
            rx="7"
            fill={theme.accent}
            fillOpacity="0.2"
          />
        </WorldFrame>
      )
    case "red-oficina-editorial":
      return (
        <WorldFrame world={world} theme={theme}>
          <rect
            x="11"
            y="11"
            width="51"
            height="35"
            rx="7"
            fill={theme.paper}
            stroke={theme.line}
            strokeWidth="2"
            opacity="0.68"
          />
          <rect
            x="18"
            y="18"
            width="51"
            height="35"
            rx="7"
            fill={theme.secondary}
            fillOpacity="0.18"
          />
          <path
            d="M126 14h37M126 26h23m-30 96 11 11 33-34"
            stroke={theme.primary}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.24"
          />
          <path
            d="m20 132 22-27 8 7-22 26-11 4Z"
            fill={theme.accent}
            fillOpacity="0.3"
          />
        </WorldFrame>
      )
    case "red-laboratorio-ensaio":
      return (
        <WorldFrame world={world} theme={theme}>
          <path
            d="M17 12h33v10H35v21c14 14 9 31-2 38H16C8 74 6 57 14 43V22H6V12Z"
            fill={theme.secondary}
            fillOpacity="0.2"
          />
          <path
            d="M13 61h34"
            stroke={theme.accent}
            strokeWidth="6"
            opacity="0.28"
          />
          <path
            d="M130 106h36v31h-36zm-14-18h36v18h-36zm31-18h23v18h-23z"
            fill={theme.primary}
            fillOpacity="0.16"
          />
          <path
            d="M117 122 145 97l14 12"
            stroke={theme.primary}
            strokeWidth="3"
            strokeDasharray="5 4"
            opacity="0.25"
          />
          <text
            x="151"
            y="130"
            textAnchor="middle"
            fill={theme.ink}
            fontSize="14"
            fontWeight="800"
            opacity="0.22"
          >
            “”
          </text>
        </WorldFrame>
      )
    default:
      return null
  }
}

export function ActivityWorldBackdrop({
  subject,
  world,
  theme,
}: {
  subject: ActivitySubject
  world: ActivityWorld
  theme: ActivityWorldTheme
}) {
  if (subject === "Língua Portuguesa") {
    return <PortugueseWorld world={world} theme={theme} />
  }

  if (subject === "Matemática") {
    return <MathWorld world={world} theme={theme} />
  }

  return <WritingWorld world={world} theme={theme} />
}
import type { ReactNode } from "react"
