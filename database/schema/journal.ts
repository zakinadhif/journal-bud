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
})

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
})

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