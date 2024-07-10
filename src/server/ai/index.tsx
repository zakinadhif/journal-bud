"use server"

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { messages } from "../../../database/schema";
import { openai } from "@ai-sdk/openai";
import { generateId } from "ai";

type Role = typeof messages.$inferInsert.role;

export interface ServerMessage {
  role: Role;
  content: string;
}

export interface ClientMessage {
  id: string;
  role: Role;
  display: React.ReactNode;
}

export async function continueConversation(input: string): Promise<ClientMessage> {
  "use server"

  const history = getMutableAIState();

  const newMessage: ServerMessage = {
    role: 'user',
    content: input
  }

  const result = await streamUI({
    model: openai("gpt-3.5-turbo"),
    messages: [...history.get(), newMessage],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content }
        ]);
      }

      return <div>{content}</div>;
    }
  });

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation
  },
  initialAIState: [],
  initialUIState: []
});