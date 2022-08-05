import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Button } from 'react-bootstrap';

import ImageSignUp from './signUpImage.jpg';
import getRoutes from '../../routes/routes';
import { useAuth } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [failedRegistration, setFailedRegistration] = useState(false);
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const { logIn } = useAuth();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const registrationValidation = yup.object().shape({
    username: yup.string()
      .min(3, 'минимальная длина имени 3 символа')
      .max(20, 'максимальная длина имени пользователя не более 20 символов')
      .trim()
      .typeError('Обязательное поле').required('Обязательное поле'),
    password: yup.string()
      .trim()
      .min(6, 'минимальная длина пародя 6 символов')
      .typeError('Обязательное поле').required('Обязательное поле'),
    confirmPassword: yup.string()
      .test('confirmPassword', 'пароли должны совпадать', (password, context) => password === context.parent.password)
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
        const { data } = await axios.post(getRoutes.signUpPath(), {username, password});
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
    <Container className='container-fluid h-100'>
      <Row className='justify-content-center align-content-center h-100'>
        <Col className='col-12 col-md-8 col-xxl-6'>
          <Card className='shadow-sm'>
            <Card.Body className='d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
              <div>
                <img src={ImageSignUp} className='rounded-circle' alt="Registratiion Avatar" />
              </div>
              <Form className='w-50'>
                <h1 className='text-center mb-4'>Регистрация</h1>
                <FormGroup className='form-floating mb-3'>
                  <FormControl
                    id='username'
                    name='username'
                    ref={usernameRef}
                    placeholder='Имя пользователя'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.username && formik.touched.username) || failedRegistration
                    }
                  />
                  <FormLabel htmlFor='username'>Имя пользователя</FormLabel>
                  <Form.Control.Feedback type='invalid' className="invalid-feedback">
                    Обязательное поле
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className='form-floating mb-3'>
                  <FormControl 
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Не менее 6 символов...'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.password && formik.touched.password) || failedRegistration
                    }
                  />
                  <FormLabel htmlFor='password'>Пароль</FormLabel>
                  <Form.Control.Feedback type='invalid' className="invalid-feedback">
                    Обязательное поле
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className='form-floating mb-3'>
                  <FormControl 
                    type='confirmPassword'
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='Не менее 6 символов...'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword) || failedRegistration
                    }
                  />
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <Form.Control.Feedback type='invalid' className="invalid-feedback">
                    Пароли не совпадают
                  </Form.Control.Feedback>
                </FormGroup>
                <Button className='w-100' variant='outline-primary' onClick={formik.handleSubmit}>Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp;
