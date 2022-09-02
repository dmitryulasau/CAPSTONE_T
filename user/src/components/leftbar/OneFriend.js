import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

import ListItemButton from "@mui/material/ListItemButton";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function OneFriend({ friend }) {
  // console.log(friend);
  return (
    <Card sx={{ maxWidth: 345, mb: 1, borderRadius: "8px" }}>
      <ListItemButton sx={{ p: 0 }}>
        <CardHeader
          avatar={
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  friend.profilePicture ||
                  "https://res.cloudinary.com/dulasau/image/upload/v1661875818/noAvatar_wdsdee.png"
                }
              />
            </StyledBadge>
          }
          title={friend.firstName + " " + friend.lastName}
          subheader={friend.username}
        />
      </ListItemButton>
    </Card>
  );
}
