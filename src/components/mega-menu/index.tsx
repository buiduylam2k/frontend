"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "../link"
import getTagTypeName from "@/services/helpers/get-tag-type-name"
import { Tag, TagEnum } from "@/services/api/types/tags"
import { useTagGroup } from "@/services/api/use-tag-group"

export function MegaMenu() {
  const { data } = useTagGroup()

  const getPathMenu = (type: TagEnum, id: Tag["id"]) => {
    return {
      [TagEnum.Blog]: `/blogs?type=${type}&tag-id=${id}`,
      [TagEnum.Class]: `/blogs?type=${type}&tag-id=${id}`,
    }[type]
  }

  return (
    <NavigationMenu className="mx-auto py-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Trang chủ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {data &&
          Object.keys(data).map((k) => (
            <NavigationMenuItem key={k}>
              <NavigationMenuTrigger>
                {getTagTypeName(k as TagEnum)}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[400px] md:grid-cols-3">
                  {data?.[k as TagEnum]?.map((c: Tag) => (
                    <ListItem
                      key={c.id}
                      href={getPathMenu(c.type, c.id)}
                      title={c.name}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

        <NavigationMenuItem>
          <Link href="/hoi-dap" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Hỏi đáp
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"
