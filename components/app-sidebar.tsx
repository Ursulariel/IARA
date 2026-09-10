"use client"

import * as React from "react"

import { primaryNavigationItems } from "@/components/navigation-items"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar"
import { QuestionCircleIcon } from "@solar-icons/react/outline/question-circle"

const secondaryNavigationItems = [
  {
    title: "Ajuda",
    url: "#",
    icon: <QuestionCircleIcon />,
  },
]

const account = {
  name: "shadcn",
  email: "m@example.com",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent className="pt-3">
        <NavMain items={primaryNavigationItems} />
        <NavSecondary items={secondaryNavigationItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="items-center pb-3">
        <NavUser user={account} />
      </SidebarFooter>
    </Sidebar>
  )
}
