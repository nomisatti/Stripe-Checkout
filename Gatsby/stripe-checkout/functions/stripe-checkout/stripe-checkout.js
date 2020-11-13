// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const stripe = require('stripe')('sk_test_51HmAjKL0MJqcaXNQPbJT1HmB8RcYcTI0AMG0Dwi979OkMrTJpIvP0gl78z2LZAnYzmceTSj75HtYP3ezYcZ8Y68P00JSUfF0gr');


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


