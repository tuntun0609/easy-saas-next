import ky from 'ky'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

/**
 * Checkout Session Interface
 * Represents the structure of a Creem checkout session response
 */
export interface CheckoutSession {
  /** Unique identifier for the checkout session */
  id: string
  /** Type of object (always "checkout_session") */
  object: string
  /** ID of the product being purchased */
  product: string
  /** Current status of the checkout session */
  status: string
  /** URL where the customer completes the purchase */
  checkout_url: string
  /** URL to redirect after successful payment */
  success_url: string
  /** Payment mode (subscription or one-time) */
  mode: string
}

/**
 * Initialize Creem SDK client
 * Server index 1 is used for test environment
 * 0: production, 1: test-mode
 */
// const creem = new Creem({
//   // serverIdx: process.env.CREEM_MODE === 'prod' ? 0 : 1,
//   serverURL: 'https://api.creem.io',
// })

/**
 * GET /api/checkout
 *
 * Creates a new checkout session for a specific product.
 * Requires authentication and product ID as query parameter.
 *
 * @async
 * @function
 * @param {NextRequest} req - Next.js request object containing:
 *   - product_id: Query parameter for the product to purchase
 *
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On success: { success: true, checkoutUrl: string }
 * - On error: { error: string } with appropriate status code
 *
 * @example
 * // Request
 * GET /api/checkout?product_id=prod_123
 *
 * // Success Response
 * {
 *   "success": true,
 *   "checkoutUrl": "https://checkout.creem.io/cs_123..."
 * }
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  // Get authenticated session from Auth.js
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  const productId = req.nextUrl.searchParams.get('product_id')

  // Verify authentication and product ID
  if (!session?.user?.id || !productId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.CREEM_API_KEY
  const successUrl = `${process.env.BASE_URL}/payment-success`

  if (!apiKey) {
    return NextResponse.json({ error: 'CREEM_API_KEY is not set' }, { status: 500 })
  }

  try {
    const baseUrl =
      process.env.CREEM_MODE === 'prod' ? 'https://api.creem.io' : 'https://test-api.creem.io'
    const checkoutSessionResponse: any = await ky
      .post(`${baseUrl}/v1/checkouts`, {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        json: {
          product_id: productId as string,
          success_url: successUrl as string,
          // Link checkout to user for tracking and fulfillment
          request_id: session?.user.id as string,
          // Additional metadata for order processing and customer info
          metadata: {
            email: session?.user.email as string,
            name: session?.user.name as string,
            userId: session?.user.id as string,
          },
          customer: {
            email: session?.user.email as string,
          },
        },
      })
      .json()

    // Return checkout URL for client-side redirect
    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutSessionResponse.checkout_url,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
