import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/profile/Profile";
import { SignUp } from "./pages/authentication/SignUp";
import { SignIn } from "./pages/authentication/SignIn";
import { ForgotPassword } from "./pages/authentication/ForgotPassword";
import { auth } from "./services/firebase";
import "./styles.css";
import history from "./helpers/History";
import { Theme } from "./helpers/Theme";
import { Path } from "./helpers/Path";
import { ResetPassword } from "./pages/profile/ResetPassword";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: Path.Home, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={Path.Dashboard} />
        )
      }
    />
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      <CssBaseline>
        <ThemeProvider theme={Theme}>
          <BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
            <Switch>
              <Route exact path={Path.Home} component={Home} />
              <PrivateRoute
                path={Path.Dashboard}
                authenticated={this.state.authenticated}
                component={Dashboard}
              />
              <PrivateRoute
                path={Path.Profile}
                authenticated={this.state.authenticated}
                component={Profile}
              />
              <PrivateRoute
                path={Path.ResetPassword}
                authenticated={this.state.authenticated}
                component={ResetPassword}
              />
              <PublicRoute
                path={Path.SignUp}
                authenticated={this.state.authenticated}
                component={SignUp}
              />
              <PublicRoute
                path={Path.SignIn}
                authenticated={this.state.authenticated}
                component={SignIn}
              />
              <PublicRoute
                path={Path.ForgotPassword}
                authenticated={this.state.authenticated}
                component={ForgotPassword}
              />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
