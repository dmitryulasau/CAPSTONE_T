import React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Comments() {
  return (
    <div style={{ padding: 0 }}>
      <Typography
        style={{ textAlign: "left" }}
        variant="h5"
        color="text.secondary"
      >
        Comments
      </Typography>

      <Paper style={{ padding: "10px 10px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              sx={{ border: "2px solid #A4b3b6" }}
              alt="Remy Sharp"
              src="https://res.cloudinary.com/dulasau/image/upload/v1662065815/Jean_Claude_Van_Damme_wewsqs.jpg"
            />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              Jean-Claude Van Damme
            </h4>
            <div style={{ textAlign: "left" }}>Nice! 👍</div>
            <div
              style={{
                fontSIze: "10px",
                paddingTop: "10px",
                textAlign: "left",
                color: "gray",
              }}
            >
              <span style={{ fontSize: "14px" }}>posted 1 minute ago</span>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
