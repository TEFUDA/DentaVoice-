import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, getStripeCustomer } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { priceId, interval } = await request.json()

    // Récupérer ou créer le customer Stripe
    const customer = await getStripeCustomer(user.email!, user.id)

    // Créer la session checkout
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || (interval === 'year' 
            ? process.env.STRIPE_PRICE_YEARLY 
            : process.env.STRIPE_PRICE_MONTHLY),
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          userId: user.id,
        },
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Erreur création checkout' },
      { status: 500 }
    )
  }
}
