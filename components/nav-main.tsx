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
        className="h-16 flex-col justify-center gap-1 rounded-lg bg-transparent px-0.5 py-1.5 text-[10px] leading-3 tracking-[-0.025em] text-orange-800 hover:bg-transparent hover:text-orange-800 active:bg-transparent active:text-orange-800 data-active:bg-transparent data-active:font-normal data-active:text-orange-800 [&>span:last-child]:w-full! [&>span:last-child]:max-w-full! [&>span:last-child]:overflow-hidden! [&>span:last-child]:text-center [&>span:last-child]:text-clip! [&>span:last-child]:whitespace-nowrap!"
      >
        {Icon && (
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg text-orange-800 transition-colors group-hover/menu-button:bg-orange-100 group-hover/menu-button:text-orange-800 [&_svg]:size-6!",
              isActive &&
                "bg-orange-600 text-white group-hover/menu-button:bg-orange-600 group-hover/menu-button:text-white"
            )}
          >
            <Icon />
          </span>
        )}
        <span className="text-orange-800">{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
