import React from 'react';

import { Button, Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../../hooks/hooks';

const Nav = () => {
  const { user, logOut } = useAuth('');
  return (
    <Navbar className="shadow-sm bg-white" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {user ? (
          <Button type="button" onClick={logOut}>
            Выйти
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Nav;
