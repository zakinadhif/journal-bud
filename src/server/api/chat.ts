"use server"

import { auth } from "@/auth";
import { ServerActionError, serverAction } from "../action";
import { createMessage, createOrGetTodayConversation, getMessages } from "../helper/chat";
import { createStreamableValue } from 'ai/rsc';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

/// Gets or create today's conversation for the current user.
export const initTodayConversation = serverAction(async () => {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new ServerActionError("Not logged in", "AUTH_NOT_LOGGED_IN");
  }

  const conversation = await createOrGetTodayConversation(session.user.id);
  const messages = await getMessages(conversation.id);

  return {
    id: conversation.id,
    messages,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt
  };
}, "GET_TODAY_CONVERSATION");

export const continueConversation = serverAction(async ({
  inquiry
}: {
  inquiry: string
}) => {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new ServerActionError("Not logged in", "AUTH_NOT_LOGGED_IN");
  }

  const conversation = await createOrGetTodayConversation(session.user.id);
  const messages = await getMessages(conversation.id);

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: messages.map((message) => ({
      role: message.role,
      content: message.content
    })).concat({
      role: 'user',
      content: inquiry
    }),
    onFinish: async ({ text: answer }) => {
      await createMessage(conversation.id, 'user', inquiry);
      await createMessage(conversation.id, 'assistant', answer);
    }
  });

  const stream = createStreamableValue(result.textStream);

  return stream.value;
}, "CONTINUE_CONVERSATION");