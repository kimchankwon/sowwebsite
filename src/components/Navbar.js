import React from "react";
import { Grid, makeStyles, Link, Container, Button } from "@material-ui/core";
import { Link as ReactRouterLink, useHistory } from "react-router-dom";
import { Path } from "../helpers/Path";
import { isAuthenticated, logout } from "../services/auth";
import logo from "../images/sowLogo.png";

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
  sowLogo: {
    height: "40px",
    cursor: "pointer",
  },
}));

export const NavBar = ({ active }) => {
  const history = useHistory();
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
          <img
            className={classes.sowLogo}
            alt="SOW Logo"
            onClick={() => history.push(Path.Home)}
            src={logo}
          />
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
              <Link
                component={ReactRouterLink}
                underline={active === Path.Profile ? "always" : "hover"}
                to={Path.Profile}
              >
                Profile
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
