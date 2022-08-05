import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Nav from './components/Nav/Nav.jsx';
import LoginPage from './components/Pages/LoginPage/LoginPage.jsx';
import NotFound from './components/Pages/NotFountPage/NotFound';

import React from 'react';
import ChatPage from './components/Pages/ChatPage/ChatPage.jsx';
import { useAuth } from './hooks/hooks.js';


const ChatRoute = ({ children }) => {
  const { user } = useAuth('');
  const location = useLocation();

  return (
    user ? children : <Navigate to="login" state={{from: location}} />
  )
}

function MainPage() {
  return (
    <div className='d-flex flex-column h-100'>
    {
      <Router>
        <Nav />
        <Routes>
        <Route
            exact
            path="/"
            element={(
              <ChatRoute>
                <ChatPage />
              </ChatRoute>
            )} />
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