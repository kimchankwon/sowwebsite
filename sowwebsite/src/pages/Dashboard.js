import React, { useState, useEffect } from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import { Path } from "../helpers/Path";
import { NavBar } from "../components/Navbar";
import { auth } from "../services/firebase";
import { roleToString } from "../helpers/Role";
import { getUser } from "../services/users";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "yellow",
  },
}));

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    getUser(auth().currentUser.uid).then((user_i) => {
      setUser(user_i);
    });
  }, []);

  return user ? (
    <>
      <NavBar active={Path.Dashboard} />
      <Container maxWidth="sm">
        <Typography>Hello {user.email}</Typography>
        <Typography>Your rank: {roleToString(user.role)}</Typography>
      </Container>
    </>
  ) : (
    <>error</>
  );
};
