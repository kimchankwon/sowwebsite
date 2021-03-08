import React, { useState, useEffect } from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import { Path } from "../helpers/Path";
import { NavBar } from "../components/Navbar";
import { auth } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "yellow",
  },
}));

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    setUser(auth().currentUser);
  }, []);

  console.log(user);

  return user ? (
    <>
      <NavBar active={Path.Dashboard} />
      <Container maxWidth="sm">
        <Typography>Hello {user.email}</Typography>
      </Container>
    </>
  ) : (
    <>error</>
  );
};
