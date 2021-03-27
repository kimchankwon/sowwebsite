import React, { useState } from "react";
import { Link as ReactRouterLink, Redirect } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { isAuthenticated, resetPassword } from "../../services/auth";
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

const resetPasswordFormValidationSchema = yup.object().shape({
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

export const ResetPassword = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    showMessage: false,
    message: "",
    severity: "error",
  });

  const handleMessageClose = () => {
    setState({ ...state, showMessage: false });
  };

  const { showMessage, message, severity } = state;

  return !isAuthenticated() ? (
    <Redirect to={Path.SignIn} />
  ) : (
    <>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Snackbar
            open={showMessage}
            onClose={handleMessageClose}
            autoHideDuration={6000}
          >
            <Alert elevation={6} variant="filled" severity={severity}>
              {message}
            </Alert>
          </Snackbar>
          <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
              Reset Password
            </Typography>
            <Typography align="center" gutterBottom>
              You can reset your password here
            </Typography>
          </Container>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              resetPassword(values.password)
                .then((success) => {
                  setState({
                    severity: "success",
                    message: success,
                    showMessage: true,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  setState({
                    severity: "error",
                    message: error.message,
                    showMessage: true,
                  });
                });
            }}
            validationSchema={resetPasswordFormValidationSchema}
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
                      Reset Password
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
              to={Path.Dashboard}
            >
              Go back to dashboard
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
