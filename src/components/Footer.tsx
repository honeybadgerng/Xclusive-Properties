import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Left Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Xstore
            </Typography>
            <Typography variant="body2">
              © {new Date().getFullYear()} RJB Xclusive. All rights reserved.
            </Typography>
          </Box>

          {/* Center Section (Links) */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/products" color="inherit" underline="hover">
                Products
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Box>
          </Box>

          {/* Right Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Link
                href="https://facebook.com"
                target="_blank"
                color="inherit"
                underline="none"
              >
                Facebook
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                color="inherit"
                underline="none"
              >
                Twitter
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                color="inherit"
                underline="none"
              >
                Instagram
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
