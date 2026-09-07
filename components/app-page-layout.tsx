"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function AppPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      open
      style={
        {
          "--sidebar-width": "5.5rem",
          "--sidebar-width-icon": "5.5rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </SidebarInset>
      <MobileNavigation />
    </SidebarProvider>
  )
}
