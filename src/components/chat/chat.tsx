"use client"

import { useChat } from "ai/react"
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <p className="font-bold">{m.role === 'user' ? "User: ": "AI: "}</p>
          <p>
            {m.content}
          </p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <Button type="submit">
          Send
        </Button>
      </form>
    </div>
  )
}