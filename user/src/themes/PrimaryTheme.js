import { createTheme } from "@mui/material";

export const themeOptions = {
  palette: {
    type: "light",
    mode: "light",
    primary: {
      main: "#2A1B3D",
    },
    secondary: {
      main: "#D83f87",
    },
    background: {
      default: "#f5f5f5",
    },
    error: {
      main: "#fa7c92",
    },
    warning: {
      main: "#fff7c0",
    },
    info: {
      main: "#44318D",
    },
    success: {
      main: "#66ab8c",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
    },
  },
  //   components: {
  //     MuiAppBar: {
  //       styleOverrides: {
  //         colorPrimary: {
  //           backgroundColor: "",
  //         },
  //       },
  //     },
  //   },
};

const theme = createTheme(themeOptions);
export default theme;
