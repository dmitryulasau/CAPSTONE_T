import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function NewRightBar() {
  return (
    <>
      <Card sx={{ bgcolor: "background.paper", borderRadius: "8px" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Traveller's
          </Typography>
          <Typography variant="h5" component="div">
            Gallery
          </Typography>
          <ImageList
            sx={{ maxWidth: 500, maxHeight: "60vh" }}
            variant="quilted"
            cols={2}
            rowHeight={121}
          >
            {itemData.map((item) => (
              <ImageListItem
                sx={{
                  transition: "all 0.4s",
                  "&:hover": { transform: "scale(0.9)" },
                  cursor: "pointer",
                }}
                key={item.id}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  style={{ borderRadius: "8px" }}
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
      </Card>
    </>
  );
}

const itemData = [
  {
    id: 1,
    img: "https://source.unsplash.com/random/?travel",
    title: "Travel",
    rows: 2,
    cols: 2,
  },
  {
    id: 2,
    img: "https://source.unsplash.com/random/?beach",
    title: "Travel",
  },
  {
    id: 3,
    img: "https://source.unsplash.com/random/?hawaii",
    title: "Travel",
  },
  {
    id: 4,
    img: "https://source.unsplash.com/random/?travel",
    title: "Travel",
    cols: 2,
  },
];
