import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { user } from './auth-schema'

// 一次性购买
export const oneTimePurchase = pgTable('onetimepurchase', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  productId: text('product_id').notNull(),
  providerCustomerId: text('provider_customer_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
