import React from "react";
import LoginRegisterContainer from "./LoginRegisterContainer";
import Animation from "./animation/Animation";
import { Box, Typography } from "@mui/material";

export default function SignIn() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Box style={{ width: "50%", height: "100vh", backgroundColor: "#FFF" }}>
          <Animation />
        </Box>
        <div
          style={{
            width: "50%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            backgroundColor: "#C5BEE3",
          }}
        >
          <div
            style={{
              backgroundColor: "#D93E87",
              textAlign: "left",
              color: "#fff",
              width: "30%",
              fontWeight: 800,
              paddingTop: "15px",
              paddingBottom: "15px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, p: 1, lineHeight: 1 }}
              variant="h4"
            >
              SHARE
            </Typography>
            <Typography
              sx={{ fontWeight: 700, p: 1, lineHeight: 0.2 }}
              variant="h4"
            >
              YOUR
            </Typography>
            <Typography
              sx={{ fontWeight: 700, p: 1, lineHeight: 1 }}
              variant="h4"
            >
              TRAVEL
            </Typography>
          </div>

          <div>
            <LoginRegisterContainer />
          </div>
        </div>
      </div>
    </>
  );
}
