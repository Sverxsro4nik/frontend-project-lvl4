import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

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
          <form action="" className='col-12 col-md-6 mt-3 mt-mb-0'>
            <h1 className='text-center mb-4'>Войти</h1>
            <div className="form-floating mb-3">
              <input
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
              <label htmlFor="username">Ваш ник</label>
            </div>
            <div className="form-floating mb-3">
            <input
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
              <label htmlFor="password">Пароль</label>
            </div>
            <button 
              type={`submit`}
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
            >Войти</button>
          </form>
        )
      }
    </Formik>
  )
}

export default LoginForm;