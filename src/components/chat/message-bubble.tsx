import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { Message } from "../../../database/schema";

export function MessageBubble({
  message
}: {
  message: Message;
}) {
  const { role } = message;

  return (
    <div className={cn("border rounded-xl p-4 w-fit mb-4 max-w-[75%]", role === "user" && "ml-auto")}>
      <Markdown>{message.content}</Markdown>
    </div>
  )
}