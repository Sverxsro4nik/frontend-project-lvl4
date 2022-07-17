import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import { Container, Navbar } from 'react-bootstrap';

import LoginPage from './components/LoginPage/LoginPage.jsx';
import NotFound from './components/NotFound';

import React from 'react';
import ChatPage from './components/ChatPage/ChatPage.jsx';

function MainPage() {
  return (
    <div className='d-flex flex-column h-100'>
    {
      <Router>
        <Navbar className='shadow-sm bg-white' bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path='/' element={<ChatPage />}></Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    }
    </div>
  );
}

export default MainPage;