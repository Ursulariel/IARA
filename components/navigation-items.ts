import type { ElementType } from "react"
import { ChartIcon } from "@solar-icons/react/outline/chart"
import { DocumentAddIcon } from "@solar-icons/react/linear/document-add"
import { HomeIcon } from "@solar-icons/react/outline/home"
import { ChecklistMinimalisticIcon } from "@solar-icons/react/linear/checklist-minimalistic"
import { UsersGroupTwoRoundedIcon } from "@solar-icons/react/outline/users-group-two-rounded"
import { ChartIcon as ChartLineDuotoneIcon } from "@solar-icons/react/line-duotone/chart"
import { DocumentAddIcon as DocumentAddLineDuotoneIcon } from "@solar-icons/react/line-duotone/document-add"
import { HomeIcon as HomeLineDuotoneIcon } from "@solar-icons/react/line-duotone/home"
import { ChecklistMinimalisticIcon as ChecklistMinimalisticLineDuotoneIcon } from "@solar-icons/react/line-duotone/checklist-minimalistic"
import { UsersGroupTwoRoundedIcon as UsersGroupTwoRoundedLineDuotoneIcon } from "@solar-icons/react/line-duotone/users-group-two-rounded"

export type PrimaryNavigationItem = {
  label: string
  href: string
  icon: ElementType
  activeIcon: ElementType
}

export const primaryNavigationItems = [
  {
    label: "Início",
    href: "/inicio",
    icon: HomeIcon,
    activeIcon: HomeLineDuotoneIcon,
  },
  {
    label: "Avaliações",
    href: "/minhas-avaliacoes",
    icon: DocumentAddIcon,
    activeIcon: DocumentAddLineDuotoneIcon,
  },
  {
    label: "Turmas",
    href: "/minhas-turmas",
    icon: UsersGroupTwoRoundedIcon,
    activeIcon: UsersGroupTwoRoundedLineDuotoneIcon,
  },
  {
    label: "Planejamentos",
    href: "/meus-planejamentos",
    icon: ChecklistMinimalisticIcon,
    activeIcon: ChecklistMinimalisticLineDuotoneIcon,
  },
  {
    label: "Análises",
    href: "/minhas-analises",
    icon: ChartIcon,
    activeIcon: ChartLineDuotoneIcon,
  },
] satisfies PrimaryNavigationItem[]
