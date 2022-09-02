import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import {
  Card,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ImageSignUp from '../../assets/signUpImage.jpg';
import getRoutes from '../../routes/routes';
import { useAuth } from '../../context/AuthProvider.js';

const SignUp = () => {
  const [failedRegistration, setFailedRegistration] = useState(false);
  const { t } = useTranslation();
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const registrationValidation = yup.object().shape({
    username: yup
      .string()
      .min(3, 'signUpPage.usernameLenght')
      .max(20, 'signUpPage.usernameLenght')
      .trim()
      .typeError('required')
      .required('required'),
    password: yup
      .string()
      .trim()
      .min(6, 'signUpPage.minPasswordLenght')
      .typeError('required')
      .required('required'),
    confirmPassword: yup
      .string()
      .test(
        'confirmPassword',
        'signUpPage.confirmPassword',
        (password, context) => password === context.parent.password,
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationValidation,
    onSubmit: async (values) => {
      setFailedRegistration(false);
      try {
        const { username, password } = values;
        const { data } = await axios.post(getRoutes.signUpPath(), {
          username,
          password,
        });
        logIn(data);
        navigate(getRoutes.chatPage());
      } catch (err) {
        if (!err.AxiosError) {
          throw err;
        }
        if (err.response.status === 409) {
          setFailedRegistration(true);
          usernameRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={ImageSignUp}
                  className="rounded-circle"
                  alt="Registratiion Avatar"
                />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    id="username"
                    name="username"
                    ref={usernameRef}
                    placeholder={t('signUpPage.username')}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || failedRegistration
                    }
                  />
                  <FormLabel htmlFor="username">
                    {t('signUpPage.username')}
                  </FormLabel>
                  {formik.errors.username ? (
                    <Form.Control.Feedback
                      type="invalid"
                      className="invalid-tooltip"
                    >
                      {t(formik.errors.username)}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback
                      type="invalid"
                      className="invalid-tooltip"
                    >
                      {t('required')}
                    </Form.Control.Feedback>
                  )}
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t('signUpPage.minPasswordLenght')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || failedRegistration
                    }
                  />
                  <FormLabel htmlFor="password">{t('password')}</FormLabel>
                  {formik.errors.password ? (
                    <Form.Control.Feedback
                      type="invalid"
                      className="invalid-tooltip"
                    >
                      {t(formik.errors.password)}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback
                      type="invalid"
                      className="invalid-tooltip"
                    >
                      {t('required')}
                    </Form.Control.Feedback>
                  )}
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="confirmPassword"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={t('signUpPage.minPasswordLenght')}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.confirmPassword
                        && formik.touched.confirmPassword)
                        || failedRegistration
                    }
                  />
                  <FormLabel>{t('signUpPage.repeatPassword')}</FormLabel>
                  {formik.errors.confirmPassword ? (
                    <Form.Control.Feedback
                      type="invalid"
                      className="invalid-tooltip"
                    >
                      {t(formik.errors.confirmPassword)}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback
                      type="invalid"
                      className="invalid-tooltip"
                    >
                      {t('required')}
                    </Form.Control.Feedback>
                  )}
                </FormGroup>
                <Button
                  type="submit"
                  className="w-100"
                  variant="outline-primary"
                >
                  {t('signUpPage.signUp')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('haveAccount')}
                </span>
                <a href={getRoutes.loginPage()}>{t('enter')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
