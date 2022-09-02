import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router";

export default function AllPosts({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { search } = useLocation();
  //   console.log(useLocation());

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(
        res.data.sort((p1, p2) => {
          console.log(p1);
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
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
}
