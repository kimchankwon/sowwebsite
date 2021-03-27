import React, { useState } from "react";
import { Link as ReactRouterLink, Redirect } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  signin,
  isAuthenticated,
  sendPasswordResetEmail,
} from "../../services/auth";
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

const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email().required("Enter your email"),
});

export const ForgotPassword = () => {
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

  return isAuthenticated() ? (
    <Redirect to={Path.Dashbaord} />
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
              Forgot Password
            </Typography>
            <Typography align="center" gutterBottom>
              Enter your email below
            </Typography>
          </Container>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values) => {
              sendPasswordResetEmail(values.email)
                .then((message) => {
                  setState({
                    severity: "success",
                    message: message,
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
            validationSchema={forgotPasswordValidationSchema}
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
                  <Grid container className={classes.button}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                    >
                      Send password reset
                    </Button>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Grid container>
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
