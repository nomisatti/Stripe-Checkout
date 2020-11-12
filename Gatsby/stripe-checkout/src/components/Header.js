import React from 'react'
import { Navbar, Nav} from 'react-bootstrap';

export default function Header () {



    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="/"> Ecommerce Website</Navbar.Brand>
            
            <Nav className="ml-auto">
               
            </Nav>
            
        </Navbar>
    )
}