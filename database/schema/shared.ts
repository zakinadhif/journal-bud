import { timestamp } from "drizzle-orm/pg-core";

export const chrono = {
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
}

export const chronoWithoutUpdate = {
  createdAt: timestamp("createdAt").notNull()
}