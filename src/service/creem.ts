import ky from 'ky'

export async function createCheckoutSession(productId: string): Promise<{
  success: boolean
  checkoutUrl: string
}> {
  const response = await ky.get('/api/creem/checkout', {
    searchParams: {
      product_id: productId,
    },
    retry: 0,
  })

  return response.json()
}

export async function getCustomerPortalUrl(customerId: string): Promise<{ url: string }> {
  const response = await ky.get('/api/creem/customer-portal', {
    searchParams: {
      customer_id: customerId,
    },
  })

  return response.json()
}
