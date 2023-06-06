import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../../customStyles.css";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom'

import im from "../../images/car.png";

function AppNav({ user, setuser ,Lgout, setLgout}) {
  const hist = useNavigate()
  const toAddCar= ()=>{
    hist("/addcar")
  }
  const toAddPart= ()=>{
    hist("/addcarpart")
  }
  const toDeleteCar= ()=>{
    hist("/carmanagement")
  }
  const toDeletePart= ()=>{
    hist("/carpartmanagement")
  }
  const toOrderManagement= ()=>{
    hist("/ordermanagement")
  }
  const logout = () => {
    setuser(null);
    setLgout(true);
    localStorage.clear();
  };

  return (
    <>
      <Navbar variant="dark" className="nav">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={im}
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
                <NavDropdown.Item className="nav" href="" onClick={toAddCar}>
                  Add Car
                </NavDropdown.Item>
                <NavDropdown.Item className="nav" href="" onClick={toDeleteCar}>
                  Delete Car
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Car Parts" id="basic-nav-dropdown">
                <NavDropdown.Item className="nav" href="" onClick={toAddPart}>
                  Add Car Part
                </NavDropdown.Item>
                <NavDropdown.Item className="nav" href="" onClick={toDeletePart}>
                  Delete Car Part
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="" onClick={toOrderManagement}>Orders</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="" onClick={logout}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNav;
