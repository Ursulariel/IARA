"use client"

import * as React from "react"
import Link from "next/link"

import { primaryNavigationItems } from "@/components/navigation-items"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MagicWand3Icon } from "@solar-icons/react/outline/magic-wand-3"
import { QuestionCircleIcon } from "@solar-icons/react/outline/question-circle"
import { SettingsIcon } from "@solar-icons/react/outline/settings"

const account = {
  name: "shadcn",
  email: "m@example.com",
}

const secondaryNavigationItems = [
  {
    title: "Configurações",
    url: "#",
    icon: <SettingsIcon />,
  },
  {
    title: "Ajuda",
    url: "#",
    icon: <QuestionCircleIcon />,
  },
]
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              aria-label="IARA"
              className="flex h-10 items-center justify-center rounded-lg p-0!"
              render={<Link href="/inicio" />}
            >
              <MagicWand3Icon className="size-6! text-orange-800" />
              <span className="sr-only">IARA</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={primaryNavigationItems} />
        <NavSecondary items={secondaryNavigationItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={account} />
      </SidebarFooter>
    </Sidebar>
  )
}
