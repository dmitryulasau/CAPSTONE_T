import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoIcon from "@mui/icons-material/Photo";
import Container from "@mui/material/Container";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";

export default function Share() {
  const { user } = useContext(AuthContext);

  const desc = useRef();
  const [file, setFile] = useState(null);

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(user);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}

    // console.log(newPost);
  };

  return (
    <Paper elevation={8} sx={{ p: "20px 10px", mb: 4 }}>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Box sx={{ alignSelf: "flex-start", justifySelf: "center" }}>
          <Avatar
            sx={{ border: "2px solid #A4b3b6" }}
            alt="Travis Howard"
            src={
              user.profilePicture ||
              "https://res.cloudinary.com/dulasau/image/upload/v1661875818/noAvatar_wdsdee.png"
            }
          />
        </Box>
        <Container maxWidth="md">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,

                width: "99%",
              },
            }}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <Box sx={{ width: 1 }}>
              <TextField
                id="standard-multiline-static"
                label="Travel tip"
                multiline
                rows={2}
                placeholder={"Share you travel tip, " + user.username}
                variant="standard"
                fullWidth
                ref={desc}
                value={value}
                onChange={handleChange}
              />{" "}
              {/* <input
              placeholder={"What's in your mind " + user.username + "?"}
              className="shareInput"
            /> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "auto",
              }}
            >
              {" "}
              <Box>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <PhotoIcon />
                </IconButton>
              </Box>
              {file && (
                <div>
                  <img src={URL.createObjectURL(file)} alt="" width={"54px"} />
                  <IconButton>
                    <CloseIcon
                      onClick={() => setFile(null)}
                      fontSize="small"
                      color="error"
                    />
                  </IconButton>
                </div>
              )}
              <Box>
                <Button color="secondary" variant="contained" type="submit">
                  SHARE
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
}
