"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavSecondary({
  items,
  className,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup className={cn("px-1 py-2", className)} {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                render={<a href={item.url} />}
                className="h-16 flex-col justify-center gap-1 rounded-lg bg-transparent px-0.5 py-1.5 text-[10px] leading-3 tracking-[-0.025em] text-sidebar-foreground hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground [&>span:last-child]:w-full! [&>span:last-child]:max-w-full! [&>span:last-child]:overflow-hidden! [&>span:last-child]:text-center [&>span:last-child]:text-clip! [&>span:last-child]:whitespace-nowrap!"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground transition-colors group-hover/menu-button:bg-sidebar-accent group-hover/menu-button:text-sidebar-accent-foreground [&_svg]:size-6!">
                  {item.icon}
                </span>
                <span className="text-sidebar-foreground">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
