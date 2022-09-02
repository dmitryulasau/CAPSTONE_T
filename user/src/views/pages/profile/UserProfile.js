import React, { useState } from "react";
import Box from "@mui/material/Box";
import "./userprofile.css";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";

export default function UserProfile({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  // console.log(JSON.stringify(user.followers));

  // console.log(`USER: ${JSON.stringify(user)}`);

  // console.log(`USER ID: ${JSON.stringify(user._id)}`);

  // console.log(`CURRENT USER: ${JSON.stringify({ user: currentUser })}`);

  // console.log(currentUser);
  // console.log(followed);
  // console.log(user);
  // console.log(currentUser.followings.includes(user?._id));
  // console.log(typeof user._id);
  // console.log(followed);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container maxWidth="md" className="containerProfile">
        <Box sx={{ height: "20vh" }} />
      </Container>
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          alt="Remy Sharp"
          src={
            user.profilePicture ||
            "https://res.cloudinary.com/dulasau/image/upload/v1661875818/noAvatar_wdsdee.png"
          }
          sx={{
            position: "relative",
            width: 160,
            height: 160,
            m: "0 auto",
            top: "-80px",
            border: "3px solid white",
          }}
        />
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ mb: 1, mt: "-70px" }}
        >
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        {/* FOLLOW UNFOLLOW */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          {user._id !== currentUser._id &&
            (followed ? (
              <Button
                onClick={handleClick}
                color="error"
                variant="contained"
                endIcon={<HeartBrokenRoundedIcon />}
              >
                UNFOLLOW
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                color="info"
                variant="contained"
                endIcon={<AddCircleIcon />}
              >
                FOLLOW
              </Button>
            ))}
        </Box>
        {/* FOLLOW UNFOLLOW */}
        <Divider />
      </Box>

      <Typography variant="h4" color="text.primary" sx={{ mt: 2, mb: 2 }}>
        {user.username}'s posts:
      </Typography>
    </>
  );
}
