import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
  const validateSchema = yup.object().shape({
    username: yup.string().typeError('Поле должно быть заполнено').required('Поле должно быть заполнено'),
    password: yup.string().typeError('Поле должно быть заполнено').required('Поле должно быть заполнено'),
  });
  return (
    <Formik
      initialValues={{username: '', password: ''}}
      validateOnBlur
      onSubmit={(values) => console.log(values)}
      validationSchema={validateSchema}
    >
      {
        ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <Form action="" className='col-12 col-md-6 mt-3 mt-mb-0'>
            <h1 className='text-center mb-4'>Войти</h1>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                type={`text`}
                className={`form-control${!errors.username ? '' : ' in-valid'}`}
                name={`username`}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete={`username`}
                placeholder='Ваш ник'
                id={`username`}
                value={values.username}
              />
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
            </Form.Group>
            <Form.Group className="form-floating mb-3">
            <Form.Control
                type={`password`}
                className={`form-control${!errors.password ? '' : ' in-valid'}`}
                name={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete={`password`}
                placeholder='Пароль'
                id={`password`}
                value={values.password}
              />
              <Form.Label htmlFor="password">Пароль</Form.Label>
            </Form.Group>
            <Button
              variant="outline-primary"
              className='w-100 mb-3'
              type={`submit`}
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
            >Войти</Button>
          </Form>
        )
      }
    </Formik>
  )
}

export default LoginForm;