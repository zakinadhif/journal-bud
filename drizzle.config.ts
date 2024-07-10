import dotenv from "dotenv";
import type { Config } from 'drizzle-kit';

dotenv.config({
  path: '.env.local',
})

export default {
  schema: './database/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;