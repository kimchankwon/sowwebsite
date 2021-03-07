import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { auth } from "./services/firebase";
import "./styles.css";
import history from "./helpers/History";
import { Theme } from "./helpers/Theme";
import { Path } from "./helpers/Path";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
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
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
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
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
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
          <Router history={history}>
            <Switch>
              <Route exact path={Path.Home} component={Home} />
              <PrivateRoute
                path={Path.Dashboard}
                authenticated={this.state.authenticated}
                component={Dashboard}
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
            </Switch>
          </Router>
        </ThemeProvider>
      </CssBaseline>
    );
  }
}

export default App;
