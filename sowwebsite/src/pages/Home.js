import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import { Path } from "../helpers/Path";
import { NavBar } from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "yellow",
  },
}));

export const Home = () => {
  const classes = useStyles();
  return (
    <>
      <NavBar active={Path.Home} />
      <Container maxWidth="sm">
        <Typography>Hello</Typography>
      </Container>
    </>
  );
};
