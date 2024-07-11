import { users } from "./auth";

import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { chrono } from "./shared";

export const conversations = pgTable("conversation", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  ...chrono
});
export type NewConversation = typeof conversations.$inferInsert;
export type Conversation = typeof conversations.$inferSelect;

// Tool isn't supported yet
export const messageRoleEnum = pgEnum("messageRole", ['system', 'user', 'assistant', /* 'tool' */]);

export const messages = pgTable("message", {
  id: serial("id").primaryKey(),
  conversationId: text("conversationId")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),

  role: messageRoleEnum("role").notNull(),
  content: text("content").notNull(),

  ...chrono
});
export type NewMessage = typeof messages.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type MessageRole = typeof messages.$inferInsert.role;

export const journals = pgTable("journal", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  conversationId: text("conversationId")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  
  content: text("content").notNull(),

  ...chrono
})
export type NewJournal = typeof messages.$inferInsert;
export type Journal = typeof messages.$inferSelect;