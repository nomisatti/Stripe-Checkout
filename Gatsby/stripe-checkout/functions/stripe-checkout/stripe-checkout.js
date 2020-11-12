// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.handler = async (event , context) => {
  console.log('Event ' , event.headers.origin)
  try {
   
    const session = await stripe.checkout.sessions.create({
      
      payment_method_types: ['card'],
      line_items: [{ price: event.body, quantity: 1 }],
      mode: 'payment',
      success_url: `${ event.headers.origin}/payment-success`,
      cancel_url: `${ event.headers.origin}/cancel`,
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}


