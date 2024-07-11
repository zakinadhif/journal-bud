"use server"

import { auth } from "@/auth";
import { ServerActionError, serverAction } from "../action";
import { createMessage, createOrGetTodayConversation, getMessages } from "../helper/chat";

/// Gets or create today's conversation for the current user.
export const initTodayConversation = serverAction(async () => {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new ServerActionError("Not logged in", "AUTH_NOT_LOGGED_IN");
  }

  const conversation = await createOrGetTodayConversation(session.user.id);
  const messages = await getMessages(conversation.id);

  if (messages.length === 0) {
    await createMessage(conversation.id, "system", "You're a helpful journal buddy");
  }

  return {
    id: conversation.id,
    messages,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt
  };
}, "GET_TODAY_CONVERSATION");