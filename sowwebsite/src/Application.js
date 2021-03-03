import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import ProfilePage from "./routes/ProfilePage";
import PasswordReset from "./routes/PasswordReset";
import { UserContext } from "./providers/UserProvider";
function Application() {
  const user = useContext(UserContext);
  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
}
export default Application;
