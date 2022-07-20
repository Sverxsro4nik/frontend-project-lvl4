import React from 'react';

import { Button, Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const Nav = () => {
  const { user } = useAuth('');
  return (
    <Navbar className='shadow-sm bg-white' bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {user ? <Button type="button">Выйти</Button> : null}
      </Container>
    </Navbar>
  )
}

export default Nav;
