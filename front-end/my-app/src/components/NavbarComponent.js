import React,{Component} from 'react'
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Products from './Products';
import Orders from './Orders';
export default class NavbarComponent extends Component{
    render(){
        return(
            <Router>
            <div>
                <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Menu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/orders"}>Orders</Nav.Link>
                        <Nav.Link as={Link} to={"/products"}>Products</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
            <div>
            <Switch>
          <Route path="/orders">
           <Orders/>
          </Route>
          <Route path="/products">
          <Products/>
          </Route>
          
        </Switch>
            </div>
            </Router>
        )

    }

}