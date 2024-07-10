"use client"

import { useChat } from "ai/react"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { ClientMessage } from "@/server/ai";
import { cn } from "@/lib/utils";
import { generateId } from "ai";

export function Chat() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div className="grow flex flex-col">
      <div className="grow">
        <div className="mt-40">
          {conversation.map((message: ClientMessage) => (
            <div key={message.id} className={cn("flex", message.role === "user" && "justify-end")}>
              {message.display}
            </div>
          ))}
        </div>
      </div>
      
      <form
        onSubmit={async (e) => {
          e.preventDefault();
      
          setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            { id: generateId(), role: 'user', display: input },
          ]);
      
          const message = await continueConversation(input);
      
          setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            message,
          ]);
        }}
        className="px-4 py-8"
      >
        <fieldset className="flex border rounded-xl overflow-clip">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
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