import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  : null as any

export const getStripeCustomer = async (email: string, userId: string) => {
  if (!stripe) throw new Error('Stripe not configured')
  
  const customers = await stripe.customers.list({ email, limit: 1 })
  
  if (customers.data.length > 0) {
    return customers.data[0]
  }
  
  return await stripe.customers.create({
    email,
    metadata: { userId }
  })
}
