import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar() {
    return (
        <header className="h-16 flex justify-between items-center px-8">
            <section>
                <p className="text-xl font-bold">
                    <Link href="/">
                        JournalBud
                    </Link>
                </p>
            </section>
            <nav className="flex items-center gap-6">
                <ul className="flex items-center gap-4 text-sm">
                    <li><Link href="/chat">new-chat</Link></li>
                    <li><Link href="/journals">gallery</Link></li>
                </ul>

                <Avatar className="w-8 h-8 text-sm">
                    <AvatarImage src="nosrc" alt="@the.person.tag" />
                    <AvatarFallback>ZN</AvatarFallback>
                </Avatar>
            </nav>
        </header>
    )
}