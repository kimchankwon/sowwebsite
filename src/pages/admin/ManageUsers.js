import React from "react";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import { Path } from "../../helpers/Path";
import { NavBar } from "../../components/Navbar";
import { Roles } from "../../helpers/Role";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "yellow",
  },
}));

export const ManageUsers = () => {
  const classes = useStyles();
  return (
    <>
      <NavBar active={Path.Home} />
      <Container maxWidth="sm">
        <Typography>Hello</Typography>
        <Button
          onClick={() => {
            signup("hypaer@gmail.com", "passWord123", Roles.Staff);
          }}
        >
          hi
        </Button>
      </Container>
    </>
  );
};
