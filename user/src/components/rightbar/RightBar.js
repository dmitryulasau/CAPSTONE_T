import { Container } from "@mui/material";
import React from "react";
import CountrySelect from "../countries/CountrySelect";

export default function RightBar() {
  return (
    <Container maxWidth="md" sx={{}}>
      <CountrySelect />
    </Container>
  );
}
