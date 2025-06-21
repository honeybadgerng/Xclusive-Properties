"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import { IProduct } from "@/models/Product";
import { useCart } from "../context/CartContext"; // Import useCart from context
import ReactMarkdown from "react-markdown";

export default function ProductDetailsClient({
  product,
}: {
  product: IProduct;
}) {
  const { addToCart } = useCart(); // Use the addToCart function from context
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  // Handle image selection for carousel
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Add product to cart
  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity,
      _id: product._id as string,
    };
    addToCart(productWithQuantity);
    alert(`${product.name} added to the cart!`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={selectedImage}
              alt={product.name}
              sx={{ borderRadius: 2 }}
            />
          </Card>
          <Stack direction="row" spacing={1} mt={2} overflow="auto">
            {product.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Image ${idx + 1}`}
                onClick={() => handleImageClick(image)}
                style={{
                  width: 80,
                  height: 80,
                  cursor: "pointer",
                  border:
                    image === selectedImage
                      ? "2px solid #1976d2"
                      : "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            ))}
          </Stack>
          {product.videoUrl && (
            <Box mt={3}>
              <Typography variant="subtitle1" mb={1}>
                Product Video:
              </Typography>
              <video
                src={product.videoUrl}
                controls
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          )}
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" mb={3}>
            ₦{product.price.toLocaleString()}
          </Typography>
          <Typography variant="body1" mb={2}>
            <ReactMarkdown>{product.description}</ReactMarkdown>
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </Button>
            <TextField
              value={quantity}
              size="small"
              inputProps={{ style: { textAlign: "center" }, readOnly: true }}
              sx={{ width: 60 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </Button>
          </Stack>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Brand: {product.brand || "N/A"}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Category: {product.category}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Stock:{" "}
            {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
          </Typography>
          <Stack direction="row" spacing={1} mt={2}>
            {product.tags.map((tag, idx) => (
              <Chip key={idx} label={tag} color="primary" variant="outlined" />
            ))}
          </Stack>
          <Box mt={4}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}
              sx={{
                width: "100%",
                color: "white",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
