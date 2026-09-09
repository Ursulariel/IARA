import type { ElementType } from "react"
import { ChartIcon } from "@solar-icons/react/outline/chart"
import { DocumentTextIcon } from "@solar-icons/react/outline/document-text"
import { HomeIcon } from "@solar-icons/react/outline/home"
import { NotebookIcon } from "@solar-icons/react/outline/notebook"
import { UsersGroupTwoRoundedIcon } from "@solar-icons/react/outline/users-group-two-rounded"
import { ChartIcon as ChartLineDuotoneIcon } from "@solar-icons/react/line-duotone/chart"
import { DocumentTextIcon as DocumentTextLineDuotoneIcon } from "@solar-icons/react/line-duotone/document-text"
import { HomeIcon as HomeLineDuotoneIcon } from "@solar-icons/react/line-duotone/home"
import { NotebookIcon as NotebookLineDuotoneIcon } from "@solar-icons/react/line-duotone/notebook"
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
    label: "Turmas",
    href: "/minhas-turmas",
    icon: UsersGroupTwoRoundedIcon,
    activeIcon: UsersGroupTwoRoundedLineDuotoneIcon,
  },
  {
    label: "Avaliações",
    href: "/minhas-avaliacoes",
    icon: DocumentTextIcon,
    activeIcon: DocumentTextLineDuotoneIcon,
  },
  {
    label: "Planejamentos",
    href: "/meus-planejamentos",
    icon: NotebookIcon,
    activeIcon: NotebookLineDuotoneIcon,
  },
  {
    label: "Análises",
    href: "/minhas-analises",
    icon: ChartIcon,
    activeIcon: ChartLineDuotoneIcon,
  },
] satisfies PrimaryNavigationItem[]
