import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import TextField from "@mui/material/TextField";

import MUIButton from "@mui/material/Button";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useContext, useState, useRef } from "react";

import { loginCall } from "../../../../apiCalls";
import { AuthContext } from "../../../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const FormSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid e-mail format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function LoginForm({ handleChange, reg }) {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (values) => {
    loginCall({ email: values.email, password: values.password }, dispatch);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: FormSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  // console.log(user);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid>
        <Paper
          sx={{
            p: "20px",

            width: 340,
            m: "0 auto",
          }}
        >
          <Grid align="center">
            <Avatar sx={{ bgcolor: "avatar.main" }}>
              <FaceTwoToneIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter email address"
            fullWidth
            // FORMIK
            id="email"
            name="email"
            ref={email}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ mb: 2, mt: 2 }}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            // FORMIK
            id="password"
            name="password"
            ref={password}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* <Error>{error}</Error> */}
          <MUIButton
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ m: "14px 0" }}
            disabled={isFetching}
          >
            {isFetching ? (
              <Typography
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                LOADING &nbsp; <CircularProgress size="25px" color="inherit" />
              </Typography>
            ) : (
              <Typography
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Sign In &nbsp;
                <LoginTwoToneIcon sx={{ fontSize: "20px" }} />
              </Typography>
            )}
          </MUIButton>
          {reg ? (
            <Typography>
              New user? &nbsp;
              <Link
                to="/register"
                underline="hover"
                sx={{ color: "secondary.main" }}
              >
                Click to Register!
              </Link>
            </Typography>
          ) : (
            <Typography>
              New user? &nbsp;
              <Link
                onClick={() => handleChange("event", 1)}
                href="#"
                underline="hover"
                sx={{ color: "secondary.main" }}
              >
                Click to Register!
              </Link>
            </Typography>
          )}
        </Paper>
      </Grid>
    </form>
  );
}
