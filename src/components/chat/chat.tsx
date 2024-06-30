"use client"

import { useChat } from "ai/react"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { MessageBubble } from "./message-bubble";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="grow flex flex-col">
      <div className="grow">
        <div className="mt-40">
          {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-4 py-8"
      >
        <fieldset className="flex border rounded-xl overflow-clip">
          <Input
            value={input}
            onChange={handleInputChange}
            className="border-0 focus-visible:ring-0 focus-visible:ring-transparent"
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