import React, { useState }  from 'react';
import { Redirect } from 'react-router'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import requestHandler from '../services/requestHandler';
import { AppConsumer } from '../context';

const LoginPage = (props) => {

  const [allowRedirect, setallowRedirect] = useState(false);


  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (

    <div>
      <h1>This is the LoginPage</h1>


      <Formik
        initialValues={{ username: '',  password: '' }}
        validate={values => {
          let errors = {};
          if ( !values.username || !values.password) {
            // errors.email = !values.email ? 'Email Required' : undefined;
            errors.username = !values.username ? 'Username or Email Required' : undefined;
            errors.password = !values.password ? 'Password Required' : undefined;
          } 
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          requestHandler.loginUser(values).then(res => {
            handleUsernameChange(res.data.username)
            setallowRedirect(true)
          }).catch((err) => {
            console.log(err, 99);
          })
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" />
            {/* <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" /> */}
            <Field type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
          </Form>
        )}
      </Formik>

          {allowRedirect && (
            <Redirect to="/" />)
          }

    </div>
      )}
    </AppConsumer>
  )
};

export default LoginPage;
