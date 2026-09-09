"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BellIcon } from "@solar-icons/react/outline/bell"
import { CardIcon } from "@solar-icons/react/outline/card"
import { LogoutIcon } from "@solar-icons/react/outline/logout"
import { SettingsIcon } from "@solar-icons/react/outline/settings"
import { UserCircleIcon } from "@solar-icons/react/outline/user-circle"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string
  }
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Abrir menu da conta"
            className="flex size-13 cursor-pointer items-center justify-center rounded-full bg-white/85 p-1 outline-none shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-orange-600/45 active:translate-y-0"
          />
        }
      >
        <Avatar className="size-11 rounded-full after:rounded-full">
          <AvatarImage className="rounded-full" src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
            CN
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56"
        side="bottom"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8 rounded-full after:rounded-full">
                <AvatarImage className="rounded-full" src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-full">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCircleIcon />
            Conta
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CardIcon />
            Faturamento
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notificações
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutIcon />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
