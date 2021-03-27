import React, { useState } from "react";
import { Link as ReactRouterLink, Redirect } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { signup, isAuthenticated } from "../../services/auth";
import { Path } from "../../helpers/Path";
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
import { Roles } from "../../helpers/Role";

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

const signUpFormValidationSchema = yup.object().shape({
  email: yup.string().email().required("Enter valid email"),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*()]).{7,20}\S$/)
    .required(
      "Please enter a valid password. One alpabetic, one special character or number, length between 8 to 20 characters"
    ),
  confirmPassword: yup
    .string()
    .required("Required")
    .test("password-match", "Password must match", (value) => {
      return this.parent.password === value;
    }),
});

export const SignUp = () => {
  const classes = useStyles();
  const [state, setState] = useState({ showMessage: false, error: "" });

  const handleMessageClose = () => {
    setState({ ...state, showMessage: false });
  };

  async function submit(email, password) {
    try {
      await signup(email, password, Roles.Member);
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
              Sign Up
            </Typography>
            <Typography align="center" gutterBottom>
              Create a SOW Account
            </Typography>
          </Container>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              submit(values.email, values.password);
            }}
            validationSchema={signUpFormValidationSchema}
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
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    type="password"
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : "Re-enter password to confirm"
                    }
                    error={
                      errors.confirmPassword && touched.confirmPassword
                        ? true
                        : false
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                  <Grid container className={classes.button}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Grid container justify="center">
          <Grid item>
            <Link
              className={classes.bottomLink}
              underline="hover"
              component={ReactRouterLink}
              to={Path.SignIn}
            >
              Already have an account? Log in
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
