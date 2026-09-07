import type { ElementType } from "react"
import { BackpackIcon as BackpackBoldIcon } from "@solar-icons/react/bold/backpack"
import { ChartIcon as ChartBoldIcon } from "@solar-icons/react/bold/chart"
import { DocumentTextIcon as DocumentTextBoldIcon } from "@solar-icons/react/bold/document-text"
import { HomeIcon as HomeBoldIcon } from "@solar-icons/react/bold/home"
import { NotebookIcon as NotebookBoldIcon } from "@solar-icons/react/bold/notebook"
import { BackpackIcon } from "@solar-icons/react/outline/backpack"
import { ChartIcon } from "@solar-icons/react/outline/chart"
import { DocumentTextIcon } from "@solar-icons/react/outline/document-text"
import { HomeIcon } from "@solar-icons/react/outline/home"
import { NotebookIcon } from "@solar-icons/react/outline/notebook"

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
    activeIcon: HomeBoldIcon,
  },
  {
    label: "Turmas",
    href: "/minhas-turmas",
    icon: BackpackIcon,
    activeIcon: BackpackBoldIcon,
  },
  {
    label: "Avaliações",
    href: "/minhas-avaliacoes",
    icon: DocumentTextIcon,
    activeIcon: DocumentTextBoldIcon,
  },
  {
    label: "Planejamentos",
    href: "/meus-planejamentos",
    icon: NotebookIcon,
    activeIcon: NotebookBoldIcon,
  },
  {
    label: "Análises",
    href: "/minhas-analises",
    icon: ChartIcon,
    activeIcon: ChartBoldIcon,
  },
] satisfies PrimaryNavigationItem[]
