import React from "react";

import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

function Header () {
  return (
        <Navbar expand="lg">
            <Container className="my-2" id="my-nav-container">
                <Navbar.Brand className="my-2" id="logo" href="/">
                    <img src="img/logo.png" />
                </Navbar.Brand>
                <Nav.Item id="my-nav-item" className="ms-auto">
                    <Nav.Link href="/introduction">Introduction</Nav.Link>
                </Nav.Item>
                <Nav.Item id="my-nav-item" className="ms-4">
                    <Nav.Link href="/map">Map</Nav.Link>
                </Nav.Item>
                <div class="justify-content-end" className="ms-3">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav activeKey={location.pathname} className="ms-auto">
                        <Nav.Item id="my-nav-item" className="mx-1 px-1">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item id="my-nav-item" className="mx-1 px-1">
                            <Nav.Link href="/register">Sign In</Nav.Link>
                        </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
  );
}

export default Header;