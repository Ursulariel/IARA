import { CalendarAddIcon } from "@solar-icons/react/linear/calendar-add"
import { ChartSquareIcon } from "@solar-icons/react/linear/chart-square"
import { DiplomaIcon } from "@solar-icons/react/linear/diploma"
import { DocumentAddIcon } from "@solar-icons/react/linear/document-add"
import { DocumentsIcon } from "@solar-icons/react/linear/documents"
import { NotebookIcon } from "@solar-icons/react/linear/notebook"
import { UserHandUpIcon } from "@solar-icons/react/linear/user-hand-up"

import styles from "./animated-action-icon.module.css"

export type AnimatedActionIconVariant =
  | "calendar"
  | "writing"
  | "notebook"
  | "statistics"
  | "student"
  | "documents"
  | "diploma"

const icons = {
  calendar: CalendarAddIcon,
  writing: DocumentAddIcon,
  notebook: NotebookIcon,
  statistics: ChartSquareIcon,
  student: UserHandUpIcon,
  documents: DocumentsIcon,
  diploma: DiplomaIcon,
} as const

const motionClasses: Record<AnimatedActionIconVariant, string> = {
  calendar: styles.calendar,
  writing: styles.writing,
  notebook: styles.notebook,
  statistics: styles.statistics,
  student: styles.student,
  documents: styles.documents,
  diploma: styles.diploma,
}

export function AnimatedActionIcon({
  variant,
}: {
  variant: AnimatedActionIconVariant
}) {
  const Icon = icons[variant]

  return (
    <span
      className={`${styles.canvas} ${motionClasses[variant]}`}
      aria-hidden="true"
    >
      <Icon className={styles.icon} size={28} color="currentColor" />
    </span>
  )
}
