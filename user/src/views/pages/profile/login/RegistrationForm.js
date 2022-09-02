import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import MUIButton from "@mui/material/Button";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import axios from "axios";
import { useNavigate } from "react-router";

const FormSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(2, "One letter, seriously?"),
  firstName: Yup.string()
    .required("First Name is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "First Name can only contains letters."
    )
    .min(2, "One letter, seriously?"),
  lastName: Yup.string()
    .min(2, "One letter, seriously?")
    .required("Last Name is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Last Name can only contains letters."
    ),
  // city: Yup.string()
  //   .min(2, "One letter, seriously?")
  //   .required("City is required")
  //   .matches(
  //     /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
  //     "City can only contains letters."
  //   ),
  email: Yup.string()
    .email("Must be a valid e-mail format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Should be minimum 3 characters"),
  confirm_pass: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function RegistrationForm({ user, currentUser }) {
  const username = useRef();
  const firstName = useRef();
  const lastName = useRef();
  // const city = useRef();
  const email = useRef();
  const password = useRef();
  const confirm_pass = useRef();
  const navigate = useNavigate();

  const initialValues = {
    username: user?.username ? user?.username : "",
    firstName: user?.firstName ? user?.firstName : "",
    lastName: user?.lastName ? user?.lastName : "",
    // city: user?.city ? user?.city : "",
    email: user?.email ?? "",
    password: "",
    confirm_pass: "",
  };

  // const handleSubmit = (values, resetForm) => {
  //   if (user?.token) {
  //     setEditUser(values);
  //   } else {
  //     setCreateUser(values);
  //   }
  //   resetForm(initialValues);
  // };

  const handleSubmit = async (values) => {
    const user = {
      username: values.username.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      // city: values.city.trim(),
      email: values.email.trim(),
      password: values.password,
    };
    try {
      await axios.post("/auth/register", user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
    // console.log(user);
  };

  // const handleDelete = () => {
  //   setDeleteUser({ key: "value" });
  // };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: FormSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, resetForm);
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid>
        <Paper
          elevation={5}
          sx={{ p: "20px", maxWidth: 340, m: "0 auto", borderRadius: "8px" }}
        >
          <Grid align="center">
            {user?.username ? (
              ""
            ) : (
              <Avatar sx={{ bgcolor: "avatar.main" }}>
                <FaceTwoToneIcon />
              </Avatar>
            )}

            <h2>{user?.username ? "Profile" : "Registration"}</h2>
            {/* <Typography variant="caption">
              {user?.username
                ? "Edit desired field"
                : "Fill out the registration form"}
            </Typography> */}
          </Grid>
          {/* USERNAME */}
          <TextField
            sx={{ mb: 2, mt: 2 }}
            fullWidth
            label="Username"
            ref={username}
            // FORMIK
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          {/* FIRST NAME */}
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="First Name"
            ref={firstName}
            // FORMIK
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          {/* LAST NAME */}
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Last Name"
            ref={lastName}
            // FORMIK
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          {/* CITY */}
          {/* <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="City"
            ref={city}
            // FORMIK
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          /> */}

          {/* EMAIL */}
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Email"
            ref={email}
            // FORMIK
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {/* PASSWORD */}
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Password"
            type="password"
            ref={password}
            // FORMIK
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {/* CONFIRM PASSWORD */}
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Confirm password"
            type="password"
            ref={confirm_pass}
            // FORMIK
            id="confirm_pass"
            name="confirm_pass"
            value={formik.values.confirm_pass}
            onChange={formik.handleChange}
            error={
              formik.touched.confirm_pass && Boolean(formik.errors.confirm_pass)
            }
            helperText={
              formik.touched.confirm_pass && formik.errors.confirm_pass
            }
          />

          {user?.username ? (
            <MUIButton
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<EditTwoToneIcon />}
              fullWidth
              sx={{ m: "14px 0" }}
            >
              EDIT PROFILE
            </MUIButton>
          ) : (
            <MUIButton
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<HowToRegTwoToneIcon />}
              fullWidth
              sx={{ m: "14px 0" }}
            >
              REGISTER
            </MUIButton>
          )}
          {user?.username ? (
            <MUIButton
              color="error"
              endIcon={<ClearTwoToneIcon />}
              // onClick={() => {
              //   handleDelete();
              // }}
              sx={{ width: "100%", fontWeight: "bold" }}
              variant="contained"
            >
              DELETE PROFILE
            </MUIButton>
          ) : (
            ""
          )}
        </Paper>
      </Grid>
    </form>
  );
}
//////////////////////////////////////////
