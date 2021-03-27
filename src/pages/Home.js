import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Path } from "../helpers/Path";
import { NavBar } from "../components/Navbar";
import { getList, getRef } from "../services/storage";

// const useStyles = makeStyles((theme) => ({
//   title: {
//     backgroundColor: "yellow",
//   },
// }));

export const Home = () => {
  const [resources, setResources] = useState([]);
  // const classes = useStyles();
  useEffect(() => {
    getList().then((r) => {
      setResources(r);
    });
  }, []);

  return resources ? (
    <>
      <NavBar active={Path.Home} />
      <Container maxWidth="sm">
        <Typography>Hello</Typography>
        {resources.map((file, i) => (
          <Button
            onClick={() =>
              getRef(file.fullPath).then((r) => {
                window.open(r);
              })
            }
          >
            {file.name}
          </Button>
        ))}
      </Container>
    </>
  ) : (
    <>error</>
  );
};
