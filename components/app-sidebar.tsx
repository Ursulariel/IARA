"use client"

import * as React from "react"
import Image from "next/image"
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
import { QuestionCircleIcon } from "@solar-icons/react/outline/question-circle"

const account = {
  name: "shadcn",
  email: "m@example.com",
}

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
      <SidebarHeader className="px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              aria-label="IARA"
              className="flex h-10 items-center justify-center rounded-lg p-0! hover:bg-transparent"
              render={<Link href="/inicio" />}
            >
              <Image
                src="/iara-icon.svg"
                alt=""
                width={280}
                height={280}
                className="size-10 object-contain"
              />
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
