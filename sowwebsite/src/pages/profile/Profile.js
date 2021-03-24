import React, { useState, useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Grid,
  Link,
  Button,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Path } from "../../helpers/Path";
import { NavBar } from "../../components/Navbar";
import { roleToString } from "../../helpers/Role";
import { getUser, updateField } from "../../services/users";
import { PropertyComponent } from "./PropertyComponent";
import { universities } from "../../helpers/Universities";

// const useStyles = makeStyles((theme) => ({
//   title: {
//     backgroundColor: "yellow",
//   },
// }));

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [messageState, setMessageState] = useState({
    showMessage: false,
    message: "",
    severity: "success",
  });

  const [editState, setEditState] = useState({
    firstName: false,
    lastName: false,
    localChurch: false,
    university: false,
    universityDegree: false,
  });
  // const classes = useStyles();

  useEffect(() => {
    getUser().then((user_i) => {
      setUser(user_i);
    });
  }, []);

  const handleMessageClose = () => {
    setMessageState({ ...messageState, showMessage: false });
  };

  const handleChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  return user ? (
    <>
      <Snackbar
        open={messageState.showMessage}
        onClose={handleMessageClose}
        autoHideDuration={6000}
      >
        <Alert elevation={6} variant="filled" severity={messageState.severity}>
          {messageState.message}
        </Alert>
      </Snackbar>
      <NavBar active={Path.Profile} />
      <Container maxWidth="md">
        <Grid container>
          <Typography>Email: {user.email}</Typography>
          <PropertyComponent
            label="First Name"
            name="firstName"
            handleChange={handleChange}
            value={user.firstName}
            setMessageState={setMessageState}
            currentTextFieldEditState={editState.firstName}
            setCurrentTextFieldEditState={(bool) => {
              setEditState({ ...editState, firstName: bool });
            }}
            save={updateField}
          />
          <PropertyComponent
            label="Last Name"
            name="lastName"
            handleChange={handleChange}
            value={user.lastName}
            setMessageState={setMessageState}
            currentTextFieldEditState={editState.lastName}
            setCurrentTextFieldEditState={(bool) => {
              setEditState({ ...editState, lastName: bool });
            }}
            save={updateField}
          />
          <PropertyComponent
            label="Local Church"
            name="localChurch"
            handleChange={handleChange}
            value={user.localChurch}
            setMessageState={setMessageState}
            currentTextFieldEditState={editState.localChurch}
            setCurrentTextFieldEditState={(bool) => {
              setEditState({ ...editState, localChurch: bool });
            }}
            save={updateField}
          />
          {editState.university ? (
            <>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="university-label">Select University</InputLabel>
                <Select
                  disabled={!editState.university}
                  labelId="university-label"
                  id="university"
                  onChange={handleChange}
                  name="university"
                  value={user.university}
                >
                  {universities.map((uni, i) => (
                    <MenuItem key={i} value={uni}>
                      {uni}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={() =>
                  setEditState({ ...editState, university: false })
                }
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateField("university", user.university, "University")
                    .then((response) => {
                      setMessageState({
                        showMessage: true,
                        message: response,
                        severity: "success",
                      });
                      setEditState({ ...editState, university: false });
                    })
                    .catch((error) => {
                      setMessageState({
                        showMessage: true,
                        message: error,
                        severity: "error",
                      });
                    });
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography>University: {user.university}</Typography>
              <Button
                onClick={() => setEditState({ ...editState, university: true })}
              >
                Edit
              </Button>
            </>
          )}
          <PropertyComponent
            label="University Degree"
            name="universityDegree"
            handleChange={handleChange}
            value={user.universityDegree}
            setMessageState={setMessageState}
            currentTextFieldEditState={editState.universityDegree}
            setCurrentTextFieldEditState={(bool) => {
              setEditState({ ...editState, universityDegree: bool });
            }}
            save={updateField}
          />
          <Typography>Role: {roleToString(user.role)}</Typography>
          <Typography>Service At SOW: {user.serviceAtSow} years</Typography>
          <Grid item xs={12} alignItems="center" justify="flex-start">
            <Link
              underline="hover"
              component={ReactRouterLink}
              to={Path.ResetPassword}
            >
              Reset Password
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <>error</>
  );
};
