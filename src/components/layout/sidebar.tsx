"use client";

import {
  LayoutDashboard,
  LucideIcon,
  MessageSquareHeartIcon,
  NotebookIcon,
  NotebookTextIcon,
  SettingsIcon,
  VenetianMaskIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

const upperItems: SidebarItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/overview",
  },
  {
    label: "Journal Buddy",
    icon: VenetianMaskIcon,
    href: "/chat",
  },
  {
    label: "Collection",
    icon: NotebookTextIcon,
    href: "/journals",
  },
];

const lowerItems: SidebarItem[] = [
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
  },
  {
    label: "Feedback",
    icon: MessageSquareHeartIcon,
    href: "/feedback",
  }
];

function SidebarItem(item: SidebarItem) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <li>
      <Button
        variant="ghost"
        className={cn(
          "gap-2 w-full justify-start text-muted-foreground hover:text-foreground",
          isActive && "text-foreground bg-accent"
        )}
        asChild
      >
        <Link href={item.href}>
          <Icon className="" />
          {item.label}
        </Link>
      </Button>
    </li>
  );
}

export function Sidebar() {
  return (
    <aside className="flex flex-col border-r">
      <div className="flex p-4 gap-2 items-center">
        <div className="bg-primary rounded-full p-2 text-white">
          <NotebookIcon size={18} />
        </div>
        <p className="text-lg font-medium mt-[0.1rem]">JournalBud</p>
      </div>
      <div className="flex flex-col justify-between grow">
        <ul className="flex flex-col gap-2 p-2">
          {upperItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </ul>

        <ul className="flex flex-col gap-2 p-2 mb-4">
          {lowerItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
