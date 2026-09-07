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
                className="h-16 flex-col justify-center gap-1 rounded-lg bg-transparent px-0.5 py-1.5 text-[10px] leading-3 tracking-[-0.025em] text-orange-800 hover:bg-transparent hover:text-orange-800 active:bg-transparent active:text-orange-800 [&>span:last-child]:w-full! [&>span:last-child]:max-w-full! [&>span:last-child]:overflow-hidden! [&>span:last-child]:text-center [&>span:last-child]:text-clip! [&>span:last-child]:whitespace-nowrap!"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg text-orange-800 transition-colors group-hover/menu-button:bg-orange-100 group-hover/menu-button:text-orange-800 [&_svg]:size-6!">
                  {item.icon}
                </span>
                <span className="text-orange-800">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
