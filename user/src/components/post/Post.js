import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Comments from "./Comments";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const [desc, setDesc] = useState("");
  const [updateMode, setupdateMode] = useState(false);

  // console.log(user);

  const [expanded, setExpanded] = React.useState(false);

  // const randomNumber = Math.floor(Math.random() * 1000 + 1);
  // console.log(randomNumber);

  const likeStyle = {
    color: isLiked ? "salmon" : "",
    transform: isLiked ? "scale(1.2)" : "",
    transition: isLiked ? "0.3s" : "",
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  ////////////////////////////////////////////
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${post._id}`);

      setDesc(res.data.desc);
      // console.log(res.data.desc);
    };
    getPost();
  }, [post._id]);
  //////////////////////////////////////////////////
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // console.log(currentUser._id);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { userId: user._id },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        userId: user._id,
        desc,
      });
      window.location.reload();
      setupdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card elevation={2} sx={{ p: "10px 10px", maxWidth: "48vw", mb: 2 }}>
      <CardHeader
        style={{ textAlign: "left" }}
        avatar={
          <Link to={`/profile/${user.username}`}>
            <Avatar
              alt="user"
              src={
                user.profilePicture ||
                "https://res.cloudinary.com/dulasau/image/upload/v1661875818/noAvatar_wdsdee.png"
              }
              sx={{
                transition: "all 0.4s",
                "&:hover": { transform: "scale(1.1)" },
                width: "80px",
                height: "80px",
                border: "2px solid #A4b3b6",
              }}
              aria-label="user"
            ></Avatar>
          </Link>
        }
        action={
          <div>
            {post.userId === currentUser?._id && (
              <div>
                <IconButton
                  aria-label="edit"
                  onClick={() => setupdateMode(true)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton aria-label="delete" onClick={handleDelete}>
                  <ClearIcon />
                </IconButton>
              </div>
            )}
          </div>
        }
        titleTypographyProps={{ variant: "h5" }}
        title={`${user.firstName} ${user.lastName}`}
        subheader={format(post.createdAt)}
      />
      <CardContent>
        <Typography
          style={{ textAlign: "left" }}
          variant="body2"
          color="text.secondary"
        >
          {updateMode ? (
            <Box sx={{ width: 1 }}>
              <TextField
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                value={desc}
                id="standard-multiline-static"
                label="Travel tip updating"
                multiline
                rows={4}
                variant="standard"
                fullWidth
              />{" "}
            </Box>
          ) : (
            post?.desc
          )}
          {updateMode && (
            <Box sx={{ display: "flex", mt: 1, justifyContent: "center" }}>
              <Button
                sx={{ display: "flex", mt: 1, justifyContent: "flex-end" }}
                onClick={handleUpdate}
                variant="contained"
                type="submit"
                color="success"
              >
                Update
              </Button>
            </Box>
          )}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="380"
        src={
          post.img
            ? PF + post.img
            : "https://res.cloudinary.com/dulasau/image/upload/v1662060798/louis-magnotti-YvCg5X3pWzc-unsplash_ph0noc.jpg"
        }
        alt="Travel tip"
      />{" "}
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={likeHandler}>
          <FavoriteIcon style={likeStyle} />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {like}
          </Typography>
        </Box>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Typography variant="body2" color="text.secondary">
          {/* {post?.comment === 0
            ? `No comment`
            : post?.comment < 2
            ? `${post?.comment} comment`
            : `${post?.comment} comments`} */}
          1 comment
        </Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component={"span"}>
            <Comments />
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
