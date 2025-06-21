import React from "react";
import { Box } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        height: {
          xs: "60vh", // Smaller height for small screens
          sm: "80vh", // Default height for medium and larger screens
        },
        backgroundImage: "url('/images/banner.png')", // Replace with your image path
        backgroundSize: {
          xs: "contain", // For small screens
          sm: "cover", // For medium and larger screens
        },
        backgroundPosition: {
          xs: "top", // Adjust position for small screens
          sm: "center", // Center for medium and larger screens
        },
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    />
  );
}
