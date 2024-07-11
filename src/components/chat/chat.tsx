"use client"

import { useChat } from "ai/react"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { useEffect, useRef } from "react";
import { initTodayConversation } from "@/server/api/conversation";
import { unwrapAction } from "@/server/use-action";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const todayConversation = await unwrapAction(initTodayConversation());

      setMessages(todayConversation.messages.map(m => ({
        id: String(m.id),
        role: m.role as "user" | "assistant" | "system",
        content: m.content as string
      })));
    })();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="grow flex flex-col">
      <div className="grow">
        <div className="mt-40">
          {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 py-8"
      >
        <fieldset className="flex items-center border rounded-xl overflow-clip bg-white">
          <Input
            value={input}
            onChange={handleInputChange}
            className="border-0 focus-visible:ring-0 focus-visible:ring-transparent h-12"
            placeholder="Say something..."
          />
          <Button type="submit" variant="ghost">
            <SendHorizontalIcon strokeWidth={1} />
            <span className="sr-only">Send</span>
          </Button> 
        </fieldset>
      </form>
    </div>
  )
}