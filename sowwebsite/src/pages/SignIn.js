import React, { useState } from "react";
import { Link as ReactRouterLink, Redirect } from "react-router-dom";
import { signin } from "../helpers/auth";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { isAuthenticated } from "../helpers/auth";
import { Path } from "../helpers/Path";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Grid,
  Snackbar,
  Link,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  bottomLink: {
    textDecoration: "none",
    color: "black",
    fontSize: "large",
  },
}));

const signInFormValidationSchema = yup.object().shape({
  email: yup.string().email().required("Enter your email"),
  password: yup.string().required("Enter your password"),
});

export const SignIn = () => {
  const classes = useStyles();
  const [state, setState] = useState({ showMessage: false, error: "" });

  const handleMessageClose = () => {
    setState({ ...state, showMessage: false });
  };

  async function submit(email, password) {
    try {
      await signin(email, password);
    } catch (error) {
      setState({ error: error.message, showMessage: true });
    }
  }

  const { showMessage, error } = state;
  return isAuthenticated() ? (
    <Redirect to={Path.Dashboard} />
  ) : (
    <>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Snackbar
            open={showMessage}
            onClose={handleMessageClose}
            autoHideDuration={6000}
          >
            <Alert elevation={6} variant="filled" severity="error">
              {error}
            </Alert>
          </Snackbar>
          <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
              Log In
            </Typography>
            <Typography align="center" gutterBottom>
              Log into your SOW Account
            </Typography>
          </Container>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              submit(values.email, values.password);
            }}
            validationSchema={signInFormValidationSchema}
          >
            {(props) => {
              const {
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
              } = props;
              return (
                <Form className={classes.form}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      errors.email && touched.email ? errors.email : ""
                    }
                    value={values.email}
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    helperText={
                      errors.password && touched.password ? errors.password : ""
                    }
                    value={values.password}
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                  />
                  <Grid container className={classes.button}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                    >
                      Log In
                    </Button>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Grid container>
          <Grid item xs>
            <Link
              className={classes.bottomLink}
              underline="hover"
              component={ReactRouterLink}
              to={Path.ForgotPassword}
            >
              Forgot password
            </Link>
          </Grid>
          <Grid item>
            <Link
              className={classes.bottomLink}
              underline="hover"
              component={ReactRouterLink}
              to={Path.SignUp}
            >
              Create an account
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
