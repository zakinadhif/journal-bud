import { Chat } from "@/components/chat/chat";

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Page() {
  return (
    <main className="container grow flex flex-col">
      <Chat />
    </main>
  );
}
