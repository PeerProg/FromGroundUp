import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import requestHandler from '../services/requestHandler';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

});



const RegisterPage = (props) => {

  return (

    <div>

      <h1>This is the registerPage</h1>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.email || !values.username || !values.password) {
            errors.email = !values.email ? 'Email Required' : undefined;
            errors.username = !values.username ? 'Username Required' : undefined;
            errors.password = !values.password ? 'Password Required' : undefined;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          requestHandler.registerUser(values).then(res => props.history.push('/login'))
          .catch((err) => {
            alert('Request Not Completed, try again ')
          })
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" />
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
          </Form>


        )}
      </Formik>


    </div>
  );
};

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);
