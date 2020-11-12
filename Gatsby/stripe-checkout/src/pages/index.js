import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql, useStaticQuery } from 'gatsby'
import { Card, ListGroup, ListGroupItem, Button, Container, Row, Col } from 'react-bootstrap'
import Header from '../components/Header'
import './index.css'
const stripePromise = loadStripe("pk_test_51HmAjKL0MJqcaXNQYxNgmeMfWMXh6s0bjUjQbMiB8BvXbKdNIrj7IWyiEATKhU6wxChktEuEFZ6NYiiTJDKPcRrN00cdzDpm7v");


export default function Home({ location }) {


  const data = useStaticQuery(
    graphql`
        query ProductPrices {
            prices : allStripePrice 
            {
                edges {
                    node {
                        id
                        active
                        currency
                        unit_amount
                        product{
                            id
                            images
                            name
                            description
                        }
                    }
                }
            }
        }
    `
  )
  console.log("data from server : ", data)
  const ProductData = data.prices.edges ? data.prices.edges : null;
  const CheckOutRedirect = async (id) => {
    const stripe = await stripePromise;
    const response = await fetch(`/.netlify/functions/stripe-checkout`,
      {
        method: 'POST',
        body: id

      }

    )

    const data = await response.json();
    console.log("Data id : ", data)
    const result = await stripe.redirectToCheckout({
      sessionId: data.id
    });
  }


  return (
    <div>
      <Header />
      <Container>
        <Row>

          {ProductData &&
            ProductData.map((item) => (
              <Col xs={8} md={6} lg={4}>
                <Card key={item.node.id} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.node.product.images[0]} />
                  <Card.Body>
                    <Card.Title>{item.node.product.name}</Card.Title>
                    <Card.Text>
                      {item.node.product.description}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem> Price  : $ {item.node.unit_amount}</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Button onClick={() => CheckOutRedirect(item.node.id)} variant="primary">CheckOut</Button>

                  </Card.Body>
                </Card>
              </Col>
            ))

          }
        </Row>
      </Container>


    </div>
  )

}
