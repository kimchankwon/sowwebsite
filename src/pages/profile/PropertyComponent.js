import React from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";

export const PropertyComponent = ({
  label,
  name,
  handleChange,
  value,
  setMessageState,
  currentTextFieldEditState,
  setCurrentTextFieldEditState,
  save,
}) => {
  return (
    <Grid container item xs={12} alignItems="center" justify="flex-start">
      {currentTextFieldEditState ? (
        <>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={label}
              name={name}
              onChange={handleChange}
              defaultValue={value}
              disabled={!currentTextFieldEditState}
            ></TextField>
          </Grid>
          <Button onClick={() => setCurrentTextFieldEditState(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              save(name, value, label)
                .then((response) => {
                  setMessageState({
                    showMessage: true,
                    message: response,
                    severity: "success",
                  });
                  setCurrentTextFieldEditState(false);
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
          <Grid item xs={6}>
            <Typography>
              {label}: {value}
            </Typography>
          </Grid>
          <Button onClick={() => setCurrentTextFieldEditState(true)}>
            Edit
          </Button>
        </>
      )}
    </Grid>
  );
};
