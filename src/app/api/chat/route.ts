import { auth } from "@/auth";
import { ServerActionError } from "@/server/action";
import { createMessage, createOrGetTodayConversation } from "@/server/helper/chat";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";

// Set max streaming duration to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new ServerActionError("Not logged in", "AUTH_NOT_LOGGED_IN");
  }

  const conversation = await createOrGetTodayConversation(session.user.id);
  const { messages } = await req.json() as { messages: CoreMessage[] };

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: messages,
    onFinish: async ({ text }) => {
      await createMessage(conversation.id, 'user', messages.at(-1)?.content as string);
      await createMessage(conversation.id, 'assistant', text);
    }
  });

  return result.toAIStreamResponse();
}