import * as React from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import OneFriend from "./OneFriend";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FriendsList({ user }) {
  const listitemStyle = { minWidth: "2.5rem" };
  const [open, setOpen] = React.useState(false);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClickFriends = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderRadius: "8px",
        mt: 1,
      }}
      component="nav"
      aria-labelledby="friends list"
    >
      <ListItemButton onClick={handleClickFriends}>
        <ListItemIcon style={listitemStyle}>
          <Diversity1Icon />
        </ListItemIcon>
        <ListItemText primary="Friends" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component={"span"}>
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
                key={friend._id}
              >
                <OneFriend friend={friend} />
              </Link>
            ))}
          </Typography>
        </CardContent>
      </Collapse>
    </List>
  );
}
