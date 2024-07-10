import { db } from "../../../database";
import { ServerActionError } from "../action";
import { conversations, messageRoleEnum, messages as messagesSchema } from "../../../database/schema";
import { and, eq, gte, lte } from "drizzle-orm";

export const getTodayConversation = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ;)

  const todayConversations = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.userId, userId),
        gte(conversations.createdAt, today),
        lte(conversations.createdAt, new Date())
      )
    );

  // todo(zndf): Automate fixing of this fatal error.
  //
  // if this error occurs, the frontend will not be able
  // to retrieve today's conversation and the app will be
  // unusable for the whole day.
  if (todayConversations.length > 1) {
    throw new ServerActionError(
      "More than one conversation for today",
      "ASSERTION_ERROR-TODAY_CONVERSATION_NOT_UNIQUE"
    );
  }

  const todayConversation = todayConversations.at(0);

  return todayConversation;
}

export const createTodayConversation = async (userId: string) => {
  const conversation = await db.insert(conversations)
    .values({
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),      
    })
    .returning();

  return conversation.at(0);
}

export const createOrGetTodayConversation = async (userId: string) => {
  const existingConversation = await getTodayConversation(userId);

  if (existingConversation) {
    return existingConversation;
  }

  const newConversation = await createTodayConversation(userId);

  if (newConversation) {
    return newConversation;
  } else {
    throw new ServerActionError(
      "Failed to create or get today's conversation",
      "INTERNAL_ERROR-CREATE_OR_GET_TODAY_CONVERSATION"
    );
  }
};

export const getMessages = async (conversationId: string) => {
  const messages = await db
    .select({
      id: messagesSchema.id,
      role: messagesSchema.role,
      content: messagesSchema.content,
      createdAt: messagesSchema.createdAt,
      updatedAt: messagesSchema.updatedAt,
    })
    .from(messagesSchema)
    .where(
      eq(messagesSchema.conversationId, conversationId)
    );
  
  return messages;
}

export const createMessage = async (conversationId: string, role: typeof messagesSchema.$inferInsert.role, content: string) => {
  const message = await db.insert(messagesSchema)
   .values({
      conversationId: conversationId,
      role: role,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(),      
    })
    .returning({
      id: messagesSchema.id,
      role: messagesSchema.role,
      content: messagesSchema.content,
      createdAt: messagesSchema.createdAt,
      updatedAt: messagesSchema.updatedAt,
    });

  return message.at(0);
}