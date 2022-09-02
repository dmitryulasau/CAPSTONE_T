import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CasinoIcon from "@mui/icons-material/Casino";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FeedIcon from "@mui/icons-material/Feed";

export default function LeftBarNavigation() {
  const listitemStyle = { minWidth: "2.5rem" };
  const { user } = useContext(AuthContext);
  return (
    <Box
      sx={{ maxWidth: 220, bgcolor: "background.paper", borderRadius: "8px" }}
    >
      <nav aria-label="main navigation">
        <List>
          {/* MY PROFILE */}
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user.username}`}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={listitemStyle}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My profile" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* MY FEED */}
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={listitemStyle}>
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText primary="My feed" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* TRAVEL TIPS */}
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/all">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={listitemStyle}>
                  <TravelExploreIcon />
                </ListItemIcon>
                <ListItemText primary="Travel Tips" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* GAMES */}
          <ListItem
            disablePadding
            style={{ textDecoration: "none", color: "inherit" }}
            component="a"
            href="https://ulasau-guess-my-number.netlify.app/"
            target="_blank"
          >
            <ListItemButton>
              <ListItemIcon style={listitemStyle}>
                <CasinoIcon />
              </ListItemIcon>
              <ListItemText primary="Games" />
            </ListItemButton>
          </ListItem>

          {/* WEATHER */}

          <ListItem
            style={{ textDecoration: "none", color: "inherit" }}
            disablePadding
            component="a"
            href="https://dmitryulasau.github.io/week7_Weather_Service_JS/"
            target="_blank"
          >
            <ListItemButton>
              <ListItemIcon style={listitemStyle}>
                <WbSunnyIcon />
              </ListItemIcon>
              <ListItemText primary="Weather" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
