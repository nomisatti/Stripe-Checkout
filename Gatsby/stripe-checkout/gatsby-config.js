/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [{
    resolve: `gatsby-source-stripe`,
    options: {
      objects: ["Price"],
      secretKey: 'sk_test_51HmAjKL0MJqcaXNQPbJT1HmB8RcYcTI0AMG0Dwi979OkMrTJpIvP0gl78z2LZAnYzmceTSj75HtYP3ezYcZ8Y68P00JSUfF0gr',
      downloadFiles: false,
    },
  }
  ],
}
