"use client"

import * as React from "react"

import { primaryNavigationItems } from "@/components/navigation-items"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import { QuestionCircleIcon } from "@solar-icons/react/outline/question-circle"

const secondaryNavigationItems = [
  {
    title: "Ajuda",
    url: "#",
    icon: <QuestionCircleIcon />,
  },
]
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent className="pt-3">
        <NavMain items={primaryNavigationItems} />
        <NavSecondary items={secondaryNavigationItems} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
