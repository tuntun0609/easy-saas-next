import * as crypto from 'crypto'

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db'
import { oneTimePurchase } from '@/db/order-schema'

/**
 * Webhook Response Interface
 *
 * Represents the structure of incoming webhook events from Creem.
 * This is a simplified version focusing on essential fields for the template.
 *
 * @interface WebhookResponse
 * @property {string} id - Unique identifier for the webhook event
 * @property {string} eventType - Type of event (e.g., "checkout.completed", "subscription.paid")
 * @property {Object} object - Contains the event payload
 * @property {string} object.request_id - Contains userId for one-time payments
 * @property {string} object.id - Unique identifier for the payment/subscription
 * @property {Object} object.customer - Customer information
 * @property {Object} object.product - Product information including billing type
 * @property {string} object.status - Current status of the payment/subscription
 * @property {Object} object.metadata - Additional data passed during checkout
 */
export interface WebhookResponse {
  id: string
  eventType: string
  object: {
    request_id: string
    object: string
    id: string
    customer: {
      id: string
    }
    product: {
      id: string
      billing_type: string
    }
    status: string
    metadata: any
  }
}

const generateSignature = (payload: string, secret: string): string => {
  const computedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return computedSignature
}

/**
 * POST /api/webhook
 *
 * Processes incoming webhook events from Creem's payment system.
 * Handles both one-time payments and subscription lifecycle events.
 *
 * Event Types Handled:
 * 1. One-Time Payments:
 *    - checkout.completed: Payment successful, fulfill purchase
 *
 * 2. Subscriptions:
 *    - subscription.paid: New subscription or successful renewal
 *    - subscription.canceled: Subscription cancellation requested
 *    - subscription.expired: Subscription ended (payment failed or period ended)
 *
 * @async
 * @function
 * @param {NextRequest} req - Incoming webhook request containing event data
 * @returns {Promise<NextResponse>} Confirmation of webhook processing
 *
 * @example Webhook Event - One-Time Payment
 * {
 *   "id": "whk_123",
 *   "eventType": "checkout.completed",
 *   "object": {
 *     "request_id": "user_123",
 *     "id": "pay_123",
 *     "customer": { "id": "cus_123" },
 *     "product": {
 *       "id": "prod_123",
 *       "billing_type": "one-time"
 *     }
 *   }
 * }
 *
 * @example Webhook Event - Subscription
 * {
 *   "id": "whk_456",
 *   "eventType": "subscription.paid",
 *   "object": {
 *     "id": "sub_123",
 *     "metadata": { "userId": "user_123" },
 *     "customer": { "id": "cus_123" },
 *     "product": {
 *       "id": "prod_456",
 *       "billing_type": "recurring"
 *     }
 *   }
 * }
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const webhook = (await req.json()) as WebhookResponse
  const headersList = await headers()
  const signature = headersList.get('creem-signature')

  const webhookSecret = process.env.CREEM_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json({ error: 'CREEM_WEBHOOK_SECRET is not set' }, { status: 500 })
  }

  const localSignature = generateSignature(JSON.stringify(webhook), webhookSecret)

  if (localSignature !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  // Determine payment type based on billing_type
  // const isSubscription = webhook.object.product.billing_type === 'recurring'

  /**
   * One-Time Payment Flow
   * --------------------
   * 1. Verify payment completion via checkout.completed event
   * 2. Extract user ID from request_id (set during checkout)
   * 3. Store purchase record in database
   * 4. Enable access to purchased product/feature
   */
  if (webhook.eventType === 'checkout.completed') {
    const userId = webhook.object.request_id
    const productId = webhook.object.product.id
    const providerCustomerId = webhook.object.customer.id

    // Create purchase record in database
    await db.insert(oneTimePurchase).values({
      id: webhook.object.id,
      userId,
      productId,
      providerCustomerId,
    })
  }

  // Confirm webhook processing
  return NextResponse.json(
    {
      success: true,
      message: 'Webhook received successfully',
    },
    { status: 200 }
  )
}
