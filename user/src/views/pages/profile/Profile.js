import React from "react";
import Feed from "../../../components/feed/Feed";
import LeftBar from "../../../components/leftbar/LeftBar";
import NavBar from "../../../components/navbar/NavBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserProfile from "./UserProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import RegistrationForm from "./login/RegistrationForm";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import NewRightBar from "../../../components/rightbar/NewRightBar";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function Profile() {
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  ///////////////////////////////////////////////////////////
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const NotUserprofile = () => {
    return (
      <div>
        <Stack
          direction="row"
          sx={{ disply: "flex", justifyContent: "center", mb: 3 }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Item>FOLLOFERS: {user.followers?.length}</Item>
          <Item>FOLLOWING: {user.followings?.length}</Item>
        </Stack>
      </div>
    );
  };
  /////////////////////////////////////////////////////////////
  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" marginTop={1}>
          {/* // LEFT */}
          <Grid
            // position="fixed"
            // marginTop={"6vh"}
            // left="10vw"
            item
            md={2.3}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                height: "calc(100vh - 8rem)",
                // backgroundColor: "brown",
              },
            }}
          >
            <LeftBar />
          </Grid>
          {/* // USER PROFILE */}
          <Grid
            // marginTop={"6vh"}
            item
            xs={12}
            sm={6}
            md={5}
            sx={{}}
          >
            <UserProfile user={user} />

            <Feed username={username} />
          </Grid>
          {/* // RIGHT */}
          <Grid
            // position="fixed"
            // marginTop={"6vh"}
            // right="5vw"
            item
            md={3}
            sm={4}
            sx={{
              display: {
                xs: "none",
                sm: "block",
                height: "calc(100vh - 8rem)",
              },
            }}
          >
            {user._id !== currentUser._id ? (
              <div>
                {" "}
                <NotUserprofile />
                <NewRightBar />
              </div>
            ) : (
              <RegistrationForm user={user} currentUser={currentUser} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
