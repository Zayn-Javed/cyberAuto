import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../../customStyles.css"
import NavDropdown from 'react-bootstrap/NavDropdown';

import im from "../../images/car.png"
function AppNav() {
  return (
    <>
      <Navbar  variant="dark" className='nav'>
        <Container>
          <Navbar.Brand href="#home">
          <img
              alt=""
              src= {im}
              width="30"
              height="30"
              className="d-inline-block align-top"
          />{' '}
            Cyber Autos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Cars" id="basic-nav-dropdown">
              <NavDropdown.Item className='nav' href="#action/3.1">Add Car</NavDropdown.Item>
              <NavDropdown.Item className='nav' href="#action/3.2">  Delete Car </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Car Parts" id="basic-nav-dropdown">
              <NavDropdown.Item className='nav' href="#action/3.1">Add Car Part</NavDropdown.Item>
              <NavDropdown.Item className='nav' href="#action/3.2">  Delete Car Part</NavDropdown.Item>
              <NavDropdown.Item className='nav' href="#action/3.3">View Car Parts</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Orders</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}

export default AppNav;