import React from "react";
import { Grid, makeStyles, Link, Container, Button } from "@material-ui/core";
import { Link as ReactRouterLink } from "react-router-dom";
import { Path } from "../helpers/Path";
import { isAuthenticated, logout } from "../helpers/auth";

const useStyles = makeStyles((theme) => ({
  blackText: {
    color: theme.palette.common.black,
  },
  logOutButton: {
    width: "98px",
    textTransform: "none",
    borderRadius: 8,
    marginRight: theme.spacing(1),
  },
  navBarPadding: {
    margin: theme.spacing(2, 2, 2, 2),
  },
}));

export const NavBar = ({ active }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid
        className={classes.navBarPadding}
        container
        justify="left"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Link
            component={ReactRouterLink}
            className={classes.blackText}
            underline={active === Path.Home ? "always" : "hover"}
            to={Path.Home}
            variant="h6"
          >
            Home
          </Link>
        </Grid>
        {isAuthenticated() ? (
          <>
            <Grid item>
              <Link
                component={ReactRouterLink}
                underline={active === Path.Dashboard ? "always" : "hover"}
                to={Path.Dashboard}
              >
                Dashboard
              </Link>
            </Grid>
            <Grid item>
              <Button
                className={classes.logOutButton}
                variant="outlined"
                color="primary"
                onClick={logout}
                disableElevation
              >
                Logout
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Link
                underline="hover"
                component={ReactRouterLink}
                to={Path.SignIn}
              >
                SignIn
              </Link>
            </Grid>
            <Grid item>
              <Link
                underline="hover"
                component={ReactRouterLink}
                to={Path.SignUp}
              >
                SignUp
              </Link>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};
