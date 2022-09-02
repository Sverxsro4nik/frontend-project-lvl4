/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav/Nav.jsx';
import LoginPage from './components/Pages/LoginPage/LoginPage.jsx';
import NotFound from './components/Pages/NotFountPage/NotFound.jsx';

import ChatPage from './components/Pages/ChatPage/ChatPage.jsx';
import { useAuth } from './context/AuthProvider.js';
import getRoutes from './routes/routes.js';
import SignUp from './components/SignUp/SignUp.jsx';
import { ApiProvider } from './context/ApiProvider.js';

const ChatRoute = ({ children }) => {
  const { user } = useAuth('');
  const location = useLocation();

  return user ? children : <Navigate to="login" state={{ from: location }} />;
};
const AuthRoute = ({ children }) => {
  const { user } = useAuth('');
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function MainPage({ socket }) {
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Nav />
        <Routes>
          <Route
            exact
            path="/"
            element={
              (
                <ApiProvider socket={socket}>
                  <ChatRoute>
                    <ChatPage />
                  </ChatRoute>
                </ApiProvider>
              )
            }
          />
          (
          <Route path={getRoutes.chatPage()} element={<ChatPage />} />
          <Route
            path={getRoutes.loginPage()}
            element={(
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            )}
          />
          <Route
            path={getRoutes.signUpPage()}
            element={(
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            )}
          />
          <Route path="*" element={<NotFound />} />
          )
        </Routes>
        <ToastContainer autoClose={5000} />
      </Router>
    </div>
  );
}

export default MainPage;
