"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

import { primaryNavigationItems } from "@/components/navigation-items"

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-100 bg-white/95 px-1 pt-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgb(15_23_42/0.06)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {primaryNavigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.activeIcon : item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className="flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 px-0.5 text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-orange-600"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg text-orange-800 transition-colors",
                  isActive && "bg-orange-600 text-white"
                )}
              >
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <span className="w-full truncate text-center text-[9px] leading-3 font-medium tracking-[-0.025em]">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
