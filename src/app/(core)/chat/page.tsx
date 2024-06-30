import { Chat } from "@/components/chat/chat";
import { Input } from "@/components/ui/input";
import { SendHorizontalIcon, SendIcon } from "lucide-react";

export default function Page() {
  const name = "Zaki Nadhif";

  return (
    <main className="relative grow">
      <Chat />
    </main>
  );
}
