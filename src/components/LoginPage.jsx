import React, { useState }  from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import requestHandler from '../services/requestHandler';
import { AppConsumer } from '../context';

const LoginPage = (props) => {

  const [username, setUsername] = useState('');


  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (

    <div>
      <h1>This is the LoginPage</h1>
     { username ?
       <h2 >Welcome {username}</h2> : ''
      }

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
            setUsername(res.data.username)
            handleUsernameChange(res.data.username)
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



    </div>
      )}
    </AppConsumer>
  )
};

export default LoginPage;
