import React from 'react';

import { Container, Navbar } from 'react-bootstrap';

const Nav = () => {
  return (
    <Navbar className='shadow-sm bg-white' bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Nav;
