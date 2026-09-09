"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { PrimaryNavigationItem } from "@/components/navigation-items"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: readonly PrimaryNavigationItem[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="px-1 py-2">
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          {items.map((item) => (
            <NavMainItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function NavMainItem({
  item,
  pathname,
}: {
  item: PrimaryNavigationItem
  pathname: string
}) {
  const isActive = pathname === item.href
  const Icon = isActive ? item.activeIcon : item.icon

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        render={<Link href={item.href} />}
        isActive={isActive}
        className="h-16 flex-col justify-center gap-1 rounded-lg bg-transparent px-0.5 py-1.5 text-[10px] leading-3 tracking-[-0.025em] text-sidebar-foreground hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground data-active:bg-transparent data-active:font-normal data-active:text-sidebar-foreground [&>span:last-child]:w-full! [&>span:last-child]:max-w-full! [&>span:last-child]:overflow-hidden! [&>span:last-child]:text-center [&>span:last-child]:text-clip! [&>span:last-child]:whitespace-nowrap!"
      >
        {Icon && (
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground transition-colors group-hover/menu-button:bg-sidebar-accent group-hover/menu-button:text-sidebar-accent-foreground [&_svg]:size-6!",
              isActive &&
                "bg-sidebar-primary text-sidebar-primary-foreground group-hover/menu-button:bg-sidebar-primary group-hover/menu-button:text-sidebar-primary-foreground"
            )}
          >
            <Icon
              color={isActive ? "#ea580c" : undefined}
              secondaryColor={isActive ? "#2563eb" : undefined}
              secondaryOpacity={isActive ? 1 : undefined}
            />
          </span>
        )}
        <span className="text-sidebar-foreground">{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
