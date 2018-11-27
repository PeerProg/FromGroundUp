import React  from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import requestHandler from '../services/requestHandler';
import { AppConsumer } from '../context';

const LoginPage = (props) => {
  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (

    <div>
      <h1>This is the LoginPage</h1>


      <Formik
        initialValues={{ identifier: '',  password: '' }}
        validate={values => {
          let errors = {};
          if ( !values.identifier || !values.password) {
            // errors.email = !values.email ? 'Email Required' : undefined;
            errors.identifier = !values.identifier ? 'Username or Email Required' : undefined;
            errors.password = !values.password ? 'Password Required' : undefined;
          } 
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          requestHandler.loginUser(values).then(res => {
            handleUsernameChange(res.data.username)          
            // Redirect to the homepage
            props.history.push('/')
          }).catch((err) => {
            alert('Incorrect Login Information')
          })
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="identifier" placeholder="Username" />
            <ErrorMessage name="identifier" component="div" />
            <Field type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
          </Form>
        )}
      </Formik>

    </div>
      )}
    </AppConsumer>
  )
};

export default LoginPage;
