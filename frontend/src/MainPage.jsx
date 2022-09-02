/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav/Nav.jsx';
import LoginPage from './components/Pages/LoginPage/LoginPage.jsx';
import NotFound from './components/Pages/NotFountPage/NotFound.jsx';

import ChatPage from './components/Pages/ChatPage/ChatPage.jsx';
import { useAuth } from './context/AuthProvider.js';
import { ApiProvider } from './context/ApiProvider.js';
import getRoutes from './routes/routes.js';
import SignUp from './components/SignUp/SignUp.jsx';

const MainOutlet = ({ goChatPage } = false) => {
  const { user } = useAuth();
  if (goChatPage) {
    return user ? <Outlet /> : <Navigate to={getRoutes.loginPage()} />;
  }
  return user ? <Navigate to={getRoutes.chatPage()} /> : <Outlet />;
};

function MainPage({ socket }) {
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Nav />
        <Routes>
          <Route path={getRoutes.chatPage()} element={<MainOutlet goChatPage />}>
            <Route
              path=""
              element={<><ApiProvider socket={socket}><ChatPage /></ApiProvider></>}
            />
          </Route>
          <Route path={getRoutes.loginPage()} element={<MainOutlet />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path={getRoutes.signUpPage()} element={<MainOutlet />}>
            <Route path="" element={<SignUp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer autoClose={5000} />
      </Router>
    </div>
  );
}

export default MainPage;
