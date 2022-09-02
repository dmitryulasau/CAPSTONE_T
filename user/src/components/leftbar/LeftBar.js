import React from "react";
import Box from "@mui/material/Box";
import LeftBarNavigation from "./LeftBarNavigation";
import FriendsList from "./FriendsList";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LeftBar() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Box>
        <Box>
          <LeftBarNavigation />
        </Box>
        <Box>
          <FriendsList user={user} />
        </Box>
      </Box>
    </>
  );
}
