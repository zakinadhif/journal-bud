import { cn } from "@/lib/utils";
import { Message } from "ai";

export function MessageBubble({
  message
}: {
  message: Message;
}) {
  const { role } = message;

  return (
    <div className={cn("border rounded-xl p-2 w-fit mb-4 max-w-[75%]", role === "user" && "ml-auto")}>
      <p>
        {message.content}
      </p>
    </div>
  )
}