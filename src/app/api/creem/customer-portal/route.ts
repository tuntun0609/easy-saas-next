import ky from 'ky'
import { NextRequest, NextResponse } from 'next/server'

// const creem = new Creem({
//   // serverIdx: process.env.CREEM_MODE === 'prod' ? 0 : 1,
//   serverURL: 'https://api.creem.io',
// })

/**
 * GET /api/customerPortal
 *
 * Generates a unique URL for accessing the customer portal.
 * Requires a valid customer ID to generate the portal link.
 *
 * @async
 * @function
 * @param {NextRequest} req - Next.js request object containing:
 *   - customer_id: Query parameter identifying the customer
 *
 * @returns {Promise<NextResponse>} JSON response containing:
 * - Success: { url: string } - Portal access URL
 * - Error: { error: string } with appropriate status code
 *
 * @example
 * // Request
 * GET /api/customerPortal?customer_id=cus_123
 *
 * // Success Response
 * {
 *   "url": "https://portal.creem.io/cp_123..."
 * }
 *
 * // Error Response
 * {
 *   "error": "Unauthorized"
 * }
 * Status: 401 Unauthorized
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.CREEM_API_KEY
  const customerId = req.nextUrl.searchParams.get('customer_id')

  if (!apiKey) {
    return NextResponse.json({ error: 'CREEM_API_KEY is not set' }, { status: 500 })
  }

  // Verify customer ID is provided
  if (!customerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const baseUrl =
      process.env.CREEM_MODE === 'prod' ? 'https://api.creem.io' : 'https://test-api.creem.io'
    const customerPortalLogin: any = await ky
      .post(`${baseUrl}/v1/customers/billing`, {
        headers: {
          'x-api-key': apiKey,
        },
        json: {
          customer_id: customerId,
        },
      })
      .json()

    // Return the portal URL for client-side redirect
    return NextResponse.json({ url: customerPortalLogin.customer_portal_link })
  } catch (error) {
    console.error('Error generating customer portal link:', error)
    return NextResponse.json({ error: 'Failed to generate portal link' }, { status: 500 })
  }
}
