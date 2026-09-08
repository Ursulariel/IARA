import {
  ActivityWorldBackdrop,
  getActivityWorld,
  type ActivitySubject,
  type ActivityTemplateId,
  type ActivityWorldTheme,
} from "@/components/activity-illustration-worlds"

export type { ActivityTemplateId } from "@/components/activity-illustration-worlds"

type Subject = ActivitySubject

type ContextualActivityIllustrationProps = {
  subject: Subject
  schoolYear: string | null
  templateId: ActivityTemplateId
  className?: string
}

type VisualTheme = ActivityWorldTheme

type IllustrationContent = {
  focus: string
  tokens: [string, string, string]
  grid: string[]
}

const subjectThemes: Record<Subject, VisualTheme> = {
  "Língua Portuguesa": {
    primary: "#7758D8",
    secondary: "#A996F0",
    accent: "#F5B94C",
    surface: "#EEE9FF",
    paper: "#FFFDF8",
    ink: "#413269",
    line: "#CFC3F5",
  },
  Matemática: {
    primary: "#268C68",
    secondary: "#69C69B",
    accent: "#F7BE4B",
    surface: "#DCF6E8",
    paper: "#F9FFFC",
    ink: "#174C3B",
    line: "#A9DFC5",
  },
  Redação: {
    primary: "#3E79D8",
    secondary: "#78A8F2",
    accent: "#F59A49",
    surface: "#E3EEFF",
    paper: "#FCFDFF",
    ink: "#284574",
    line: "#B8D0F5",
  },
}

const portugueseContent = [
  { focus: "LETRAS", tokens: ["A", "E", "I"] },
  { focus: "SÍLABAS", tokens: ["PA", "TO", "LA"] },
  { focus: "FRASES", tokens: ["SOM", "FRA", "SE"] },
  { focus: "TEMA", tokens: ["TEMA", "IDEIA", "TEX"] },
  { focus: "CONTO", tokens: ["CON", "VER", "VOZ"] },
  { focus: "TEXTO", tokens: ["LER", "REV", "INF"] },
  { focus: "SENTIDO", tokens: ["TESE", "TOM", "EFE"] },
  { focus: "ARGUMENTO", tokens: ["ARG", "LEI", "VOZ"] },
  { focus: "AUTORIA", tokens: ["CRI", "AUT", "LING"] },
] as const

const mathContent = [
  { focus: "1 + 1", tokens: ["1", "+", "1"] },
  { focus: "2 + 2", tokens: ["2", "+", "2"] },
  { focus: "3 + 4", tokens: ["3", "+", "4"] },
  { focus: "1/2", tokens: ["1", "/", "2"] },
  { focus: "3/4", tokens: ["3", "/", "4"] },
  { focus: "12 × 4", tokens: ["12", "×", "4"] },
  { focus: "x + 4", tokens: ["x", "+", "4"] },
  { focus: "2x − 3", tokens: ["2x", "−", "3"] },
  { focus: "x² + 1", tokens: ["x²", "+", "1"] },
] as const

const writingContent = [
  { focus: "IDEIA", tokens: ["EU", "VEJO", "CRIO"] },
  { focus: "FRASE", tokens: ["INI", "MEIO", "FIM"] },
  { focus: "HISTÓRIA", tokens: ["QUEM", "ONDE", "AÇÃO"] },
  { focus: "PARÁGRAFO", tokens: ["TEMA", "DET", "FIM"] },
  { focus: "RELATO", tokens: ["FATO", "TEMPO", "VOZ"] },
  { focus: "RESENHA", tokens: ["OBRA", "IDEIA", "AVAL"] },
  { focus: "ARTIGO", tokens: ["TESE", "DADO", "ARG"] },
  { focus: "CRÔNICA", tokens: ["CENA", "OLHAR", "TOM"] },
  { focus: "ENSAIO", tokens: ["TESE", "ANÁL", "SÍNT"] },
] as const

function getContent(
  subject: Subject,
  schoolYear: string | null
): IllustrationContent {
  const yearIndex = schoolYear
    ? Math.min(8, Math.max(0, Number(schoolYear) - 1))
    : 0
  const source =
    subject === "Matemática"
      ? mathContent[yearIndex]
      : subject === "Redação"
        ? writingContent[yearIndex]
        : portugueseContent[yearIndex]
  const seed = `${source.focus}${source.tokens.join("")}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .toUpperCase()
    .split("")

  return {
    focus: source.focus,
    tokens: [...source.tokens],
    grid: Array.from(
      { length: 12 },
      (_, index) => seed[index % seed.length] ?? "A"
    ),
  }
}

function getTextSize(text: string, regular = 10) {
  if (text.length > 9) return 6.5
  if (text.length > 6) return 7.5
  return regular
}

function CategorizationArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  return (
    <>
      <rect
        x="17"
        y="13"
        width="146"
        height="124"
        rx="20"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      <text x="28" y="31" fill={theme.ink} fontSize="8" fontWeight="800">
        ORGANIZE
      </text>
      {content.tokens.map((token, index) => (
        <g
          key={`${token}-${index}`}
          transform={`translate(${29 + index * 43} 40)`}
        >
          <rect width="35" height="23" rx="8" fill={theme.paper} />
          <text
            x="17.5"
            y="15"
            textAnchor="middle"
            fill={theme.primary}
            fontSize={getTextSize(token, 9)}
            fontWeight="800"
          >
            {token}
          </text>
        </g>
      ))}
      <path
        d="M46 66v12M89 66v12M132 66v12"
        stroke={theme.line}
        strokeWidth="2.5"
        strokeDasharray="3 3"
      />
      <rect x="27" y="80" width="57" height="42" rx="12" fill={theme.primary} />
      <rect
        x="96"
        y="80"
        width="57"
        height="42"
        rx="12"
        fill={theme.secondary}
      />
      <path
        d="M37 92h37M37 101h25"
        stroke={theme.paper}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M106 92h37M106 101h25"
        stroke={theme.paper}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="76" cy="116" r="6" fill={theme.accent} />
      <circle cx="145" cy="116" r="6" fill={theme.paper} fillOpacity="0.9" />
    </>
  )
}

function SummaryArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  return (
    <>
      <rect
        x="39"
        y="9"
        width="102"
        height="132"
        rx="18"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      <rect x="48" y="17" width="84" height="116" rx="12" fill={theme.paper} />
      <rect x="48" y="17" width="84" height="27" rx="12" fill={theme.primary} />
      <path d="M48 34h84v10H48z" fill={theme.primary} />
      <text
        x="90"
        y="34"
        textAnchor="middle"
        fill={theme.paper}
        fontSize={getTextSize(content.focus, 9)}
        fontWeight="800"
      >
        {content.focus}
      </text>
      <path
        d="M60 58h55M60 68h43M60 78h58"
        stroke={theme.line}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect
        x="58"
        y="88"
        width="61"
        height="17"
        rx="6"
        fill={theme.accent}
        fillOpacity="0.36"
      />
      <path
        d="M64 96h48M60 116h34"
        stroke={theme.ink}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path d="M122 77v42l-9-7-9 7V77" fill={theme.secondary} />
    </>
  )
}

function ReviewArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  return (
    <>
      <rect
        x="25"
        y="16"
        width="130"
        height="121"
        rx="20"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      <rect x="36" y="23" width="108" height="105" rx="13" fill={theme.paper} />
      <rect x="69" y="10" width="42" height="19" rx="8" fill={theme.primary} />
      <text
        x="90"
        y="22.5"
        textAnchor="middle"
        fill={theme.paper}
        fontSize={getTextSize(content.focus, 6.5)}
        fontWeight="800"
      >
        {content.focus}
      </text>
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(48 ${44 + index * 27})`}>
          <circle
            cx="8"
            cy="8"
            r="8"
            fill={index === 2 ? theme.accent : theme.secondary}
          />
          <path
            d="m4.5 8 2.2 2.2 4.8-5"
            stroke={theme.paper}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 4h51M23 12h36"
            stroke={theme.line}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path d="m127 104 10 10m-5-15 5 5-10 10-5-5Z" fill={theme.primary} />
    </>
  )
}

function MatchingArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  return (
    <>
      <rect
        x="14"
        y="13"
        width="152"
        height="124"
        rx="20"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect
            x="25"
            y={28 + index * 35}
            width="43"
            height="25"
            rx="8"
            fill={theme.paper}
          />
          <text
            x="46.5"
            y={44 + index * 35}
            textAnchor="middle"
            fill={theme.primary}
            fontSize={getTextSize(content.tokens[index], 9)}
            fontWeight="800"
          >
            {content.tokens[index]}
          </text>
          <rect
            x="112"
            y={28 + index * 35}
            width="43"
            height="25"
            rx="8"
            fill={index === 1 ? theme.accent : theme.secondary}
          />
          <text
            x="133.5"
            y={44 + index * 35}
            textAnchor="middle"
            fill={theme.ink}
            fontSize="8"
            fontWeight="800"
          >
            {index + 1}
          </text>
          <path
            d={`M72 ${40 + index * 35}c12 ${index % 2 ? -9 : 9} 23 ${index % 2 ? -9 : 9} 36 0`}
            stroke={theme.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
        </g>
      ))}
    </>
  )
}

function FillBlankArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  return (
    <>
      <rect
        x="17"
        y="16"
        width="146"
        height="120"
        rx="20"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      <rect x="28" y="27" width="124" height="96" rx="13" fill={theme.paper} />
      <text x="39" y="45" fill={theme.ink} fontSize="8" fontWeight="800">
        COMPLETE
      </text>
      <path
        d="M39 60h36M105 60h34M39 76h23M91 76h48"
        stroke={theme.line}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M78 62h23M65 78h22"
        stroke={theme.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <rect
        x="37"
        y="91"
        width="106"
        height="23"
        rx="9"
        fill={theme.primary}
        fillOpacity="0.12"
      />
      {content.tokens.map((token, index) => (
        <g
          key={`${token}-${index}`}
          transform={`translate(${42 + index * 34} 95)`}
        >
          <rect
            width="29"
            height="15"
            rx="6"
            fill={index === 1 ? theme.accent : theme.secondary}
          />
          <text
            x="14.5"
            y="10.5"
            textAnchor="middle"
            fill={theme.ink}
            fontSize={getTextSize(token, 7)}
            fontWeight="800"
          >
            {token}
          </text>
        </g>
      ))}
    </>
  )
}

function MultipleChoiceArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  return (
    <>
      <rect
        x="24"
        y="11"
        width="132"
        height="130"
        rx="21"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      <rect
        x="34"
        y="21"
        width="112"
        height="38"
        rx="11"
        fill={theme.primary}
      />
      <text
        x="90"
        y="45"
        textAnchor="middle"
        fill={theme.paper}
        fontSize={getTextSize(content.focus, 13)}
        fontWeight="800"
      >
        {content.focus}
      </text>
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(40 ${70 + index * 22})`}>
          <circle
            cx="8"
            cy="8"
            r="8"
            fill={index === 1 ? theme.accent : theme.paper}
            stroke={index === 1 ? theme.accent : theme.line}
            strokeWidth="2"
          />
          {index === 1 ? <circle cx="8" cy="8" r="3" fill={theme.ink} /> : null}
          <rect
            x="24"
            y="3"
            width={index === 2 ? 49 : 66}
            height="10"
            rx="5"
            fill={index === 1 ? theme.secondary : theme.paper}
          />
        </g>
      ))}
    </>
  )
}

function WordSearchArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  return (
    <>
      <rect
        x="23"
        y="9"
        width="127"
        height="132"
        rx="20"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      <rect x="34" y="20" width="88" height="94" rx="12" fill={theme.paper} />
      {content.grid.map((character, index) => {
        const column = index % 4
        const row = Math.floor(index / 4)

        return (
          <g
            key={`${character}-${index}`}
            transform={`translate(${41 + column * 20} ${29 + row * 24})`}
          >
            <rect
              width="17"
              height="17"
              rx="5"
              fill={index === 5 || index === 6 ? theme.accent : theme.surface}
            />
            <text
              x="8.5"
              y="11.8"
              textAnchor="middle"
              fill={theme.ink}
              fontSize="8"
              fontWeight="800"
            >
              {character}
            </text>
          </g>
        )
      })}
      <circle
        cx="126"
        cy="103"
        r="19"
        fill={theme.paper}
        stroke={theme.primary}
        strokeWidth="5"
      />
      <path
        d="m140 117 14 14"
        stroke={theme.primary}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M118 103h16"
        stroke={theme.secondary}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  )
}

function StoryMapArt({
  theme,
  content,
}: {
  theme: VisualTheme
  content: IllustrationContent
}) {
  const nodes = [
    { x: 90, y: 23, label: content.tokens[0], fill: theme.secondary },
    { x: 35, y: 75, label: content.tokens[1], fill: theme.paper },
    { x: 145, y: 75, label: content.tokens[2], fill: theme.accent },
    { x: 90, y: 128, label: "FIM", fill: theme.paper },
  ]

  return (
    <>
      <rect
        x="12"
        y="7"
        width="156"
        height="136"
        rx="22"
        fill={theme.surface}
        fillOpacity="0.82"
      />
      <path
        d="M90 55V39M72 70 50 75m58-5 22 5M90 91v21"
        stroke={theme.primary}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5 4"
      />
      <circle cx="90" cy="73" r="24" fill={theme.primary} />
      <text
        x="90"
        y="76"
        textAnchor="middle"
        fill={theme.paper}
        fontSize={getTextSize(content.focus, 9)}
        fontWeight="800"
      >
        {content.focus}
      </text>
      {nodes.map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <rect
            x={node.x - 19}
            y={node.y - 11}
            width="38"
            height="22"
            rx="9"
            fill={node.fill}
            stroke={node.fill === theme.paper ? theme.line : "none"}
            strokeWidth="2"
          />
          <text
            x={node.x}
            y={node.y + 3}
            textAnchor="middle"
            fill={theme.ink}
            fontSize={getTextSize(node.label, 7)}
            fontWeight="800"
          >
            {node.label}
          </text>
        </g>
      ))}
    </>
  )
}

function ActivityArtwork({
  templateId,
  theme,
  content,
}: {
  templateId: ActivityTemplateId
  theme: VisualTheme
  content: IllustrationContent
}) {
  const props = { theme, content }

  switch (templateId) {
    case "categorization":
      return <CategorizationArt {...props} />
    case "summary":
      return <SummaryArt {...props} />
    case "mixed-review":
      return <ReviewArt {...props} />
    case "matching":
      return <MatchingArt {...props} />
    case "fill-blank":
      return <FillBlankArt {...props} />
    case "multiple-choice":
      return <MultipleChoiceArt {...props} />
    case "word-search":
      return <WordSearchArt {...props} />
    case "story-map":
      return <StoryMapArt {...props} />
  }
}

export function ContextualActivityIllustration({
  subject,
  schoolYear,
  templateId,
  className,
}: ContextualActivityIllustrationProps) {
  const theme = subjectThemes[subject]
  const content = getContent(subject, schoolYear)
  const world = getActivityWorld(subject, schoolYear)
  const sceneId = `${world.id}-${templateId}`

  return (
    <svg
      viewBox="0 0 180 150"
      fill="none"
      className={className}
      data-illustration-key={sceneId}
      data-world={world.name}
      aria-hidden="true"
    >
      <ActivityWorldBackdrop subject={subject} world={world} theme={theme} />
      <g
        data-scene={templateId}
        transform={`translate(${world.shiftX} ${world.shiftY}) translate(90 75) rotate(${world.tilt}) scale(${world.scale}) translate(-90 -75)`}
      >
        <ActivityArtwork
          templateId={templateId}
          theme={theme}
          content={content}
        />
      </g>
    </svg>
  )
}
