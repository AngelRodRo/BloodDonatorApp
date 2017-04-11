import React from 'react';
import {Navbar, Nav, NavItem, MenuItem, Dropdown,NavDropdown} from 'react-bootstrap';

class NavBar extends React.Component { 

  constructor(){
    super();
  }

  componentDidMount(){


  }

  render(){
    return(
      <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Blood Donators App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Login</NavItem>
              <NavItem eventKey={2} href="#">Faq</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
  }

}

export default NavBar;