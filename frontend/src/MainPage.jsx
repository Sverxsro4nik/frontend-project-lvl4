import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav/Nav.jsx';
import LoginPage from './components/Pages/LoginPage/LoginPage.jsx';
import NotFound from './components/Pages/NotFountPage/NotFound';

import ChatPage from './components/Pages/ChatPage/ChatPage.jsx';
import { useAuth } from './hooks/hooks.js';
import getRoutes from './routes/routes.js';
import SignUp from './components/SignUp/SignUp.jsx';
import SocketProvider from './context/SocketProvider.jsx';

const ChatRoute = ({ children }) => {
  const { user } = useAuth('');
  const location = useLocation();

  return user ? children : <Navigate to="login" state={{ from: location }} />;
};

function MainPage({ socket }) {
  return (
    <div className="d-flex flex-column h-100">
      {
        <Router>
          <Nav />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <SocketProvider socket={socket}>
                  <ChatRoute>
                    <ChatPage />
                  </ChatRoute>
                </SocketProvider>
              }
            />
            <Route path={getRoutes.loginPage()} element={<LoginPage />} />
            <Route path={getRoutes.chatPage()} element={<ChatPage />} />
            <Route path={getRoutes.signUpPage()} element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer autoClose={5000} />
        </Router>
      }
    </div>
  );
}

export default MainPage;
