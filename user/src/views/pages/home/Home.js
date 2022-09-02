import React from "react";
import LeftBar from "../../../components/leftbar/LeftBar";
import NavBar from "../../../components/navbar/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import Post from "../../../components/post/Post";
import Share from "../../../components/share/Share";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import NewRightBar from "../../../components/rightbar/NewRightBar";
import Typography from "@mui/material/Typography";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f3f0ff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function Home() {
  const search = useLocation();
  // console.log(useLocation().pathname);
  // console.log(search.key);
  // console.log(search.key === "default");

  const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
      const fetchPosts = async () => {
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("posts/timeline/" + user._id);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      };
      fetchPosts();
    }, [username, user._id]);

    return (
      <>
        <div style={{}}>
          {username !== user.username && <Share />}
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
          {posts.length === 0 ? (
            <Typography variant="h5" color="text.secondary">
              You have no posts yet...
            </Typography>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  const AllPosts = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const { search } = useLocation();
    // console.log(useLocation());

    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axios.get("/posts" + search);
        setPosts(res.data);
      };
      fetchPosts();
    }, [search]);

    return (
      <>
        <div style={{}}>
          {username !== user.username && <Share />}
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </>
    );
  };

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
          {/* // FEED */}
          <Grid
            // marginTop={"6vh"}
            item
            xs={11}
            sm={6}
            md={5}
            sx={{}}
          >
            {search.pathname === "/all" ? <AllPosts /> : <Feed />}
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
            {/* <RightBar /> */}
            <NewRightBar />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
