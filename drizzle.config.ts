import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

if (!process.env.SUPABASE_DATABASE_URL) {
  throw new Error('SUPABASE_DATABASE_URL is not set')
}

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // use Session Mode Connection string
    // ref: https://github.com/drizzle-team/drizzle-orm/issues/4047
    url: process.env.SUPABASE_DATABASE_URL.replace('6543', '5432'),
  },
})
