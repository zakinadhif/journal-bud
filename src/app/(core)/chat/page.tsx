import { Input } from "@/components/ui/input";
import { SendHorizontalIcon, SendIcon } from "lucide-react";

export default function Page() {
  const name = "Zaki Nadhif";

  return (
    <main className="relative grow">
      <div className="h-[calc(100vh-9.5rem)] container flex flex-col justify-center">
        <section>
          <h1 className="h1">Hi {name}!</h1>
          <p className="h3">What do you feel today?</p>
        </section>
        <div className="relative p-2 border self-start rounded-xl before:absolute before:content-[''] ">
          Chat Bubble
        </div>
      </div>

      <section className="absolute bottom-8 w-[75vw] left-1/2 -translate-x-1/2">
        <div className="flex gap-2 px-2 items-center border rounded-xl overflow-clip shadow-md">
          <Input className="border-0 focus-visible:ring-0 rounded-none" />
          <SendHorizontalIcon strokeWidth={1} />
        </div>
      </section>
    </main>
  );
}
