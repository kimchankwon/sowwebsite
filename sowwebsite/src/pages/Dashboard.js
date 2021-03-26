import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { Path } from "../helpers/Path";
import { NavBar } from "../components/Navbar";
import { roleToString } from "../helpers/Role";
import { getUser } from "../services/users";

// const useStyles = makeStyles((theme) => ({
//   title: {
//     backgroundColor: "yellow",
//   },
// }));

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  // const classes = useStyles();

  useEffect(() => {
    getUser().then((user_i) => {
      setUser(user_i);
    });
  }, []);

  return user ? (
    <>
      <NavBar active={Path.Dashboard} />
      <Container maxWidth="sm">
        <Typography>
          Hello {user.firstName} {user.lastName}
        </Typography>
        <Typography>Your rank: {roleToString(user.role)}</Typography>
      </Container>
    </>
  ) : (
    <>error</>
  );
};
