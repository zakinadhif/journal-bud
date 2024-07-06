"use client"

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const getInitials = (name: string) => {
  return name.split(" ").map((word) => word[0]).join("");
}

export function Navbar() {
  const session = useSession();

  return (
    <header className="h-16 flex justify-between items-center px-8 sticky top-0">
      <section>
        <p className="text-xl font-bold">
          <Link href="/">JournalBud</Link>
        </p>
      </section>
      <nav className="flex items-center gap-6">
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <Link href="/chat">new-chat</Link>
          </li>
          <li>
            <Link href="/journals">gallery</Link>
          </li>
        </ul>

        {session.status === "unauthenticated" ? (
          <Button onClick={() => signIn()}>
            Login
          </Button>
        ) : (
          <Avatar>
            <AvatarImage src={session.data?.user?.image || ""} alt={session.data?.user?.name || ""} />
            <AvatarFallback>{getInitials(session.data?.user?.name || "")}</AvatarFallback>
          </Avatar>
        )}
      </nav>
    </header>
  );
}
