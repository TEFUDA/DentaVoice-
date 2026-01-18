import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const getStripeCustomer = async (email: string, userId: string) => {
  const customers = await stripe.customers.list({ email, limit: 1 })
  
  if (customers.data.length > 0) {
    return customers.data[0]
  }
  
  return await stripe.customers.create({
    email,
    metadata: { userId }
  })
}
