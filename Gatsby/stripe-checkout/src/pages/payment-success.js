import React from 'react'
import {  Container} from 'react-bootstrap'

export default function PaymentSuccess() {
    return (
        <Container> 
        <div className="jumbotron text-center">
            <h1 className="display-3">Thank You!</h1>
            <p className="lead"><strong>For Shopping with Us</strong> </p>
            <hr />
            <p>
                Continue Shopping ..
            </p>
            <p className="lead">
                <a className="btn btn-primary btn-sm" href="/" role="button">Go to Store</a>
            </p>
        </div>
        </Container>
    )
}