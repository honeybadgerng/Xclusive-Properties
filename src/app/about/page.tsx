import React from "react";
import Head from "next/head";
import { Container, Typography, Box } from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us - Xstore | No. 1 Online Store</title>
        <meta
          name="description"
          content="Discover Xstore, your No. 1 online store offering a wide range of products from electronics to groceries. Experience seamless shopping with affordability and convenience."
        />
        <meta
          name="keywords"
          content="Xstore, online store, affordable shopping, electronics, groceries, clothing, toys"
        />
        <meta name="author" content="Xstore" />
        <meta name="robots" content="index, follow" />
      </Head>

      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Welcome to Xstore – Your No. 1 Online Store for Everyone!
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="body1" paragraph>
            At Xstore, we are dedicated to revolutionizing the way you shop. As
            a full-fledged online store, our mission is to make shopping easy,
            seamless, and affordable for everyone, no matter where you are. With
            a wide range of products to meet your everyday needs, we are your
            one-stop destination for all things shopping.
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Our Offerings
          </Typography>
          <Typography variant="body1" paragraph>
            We take pride in providing a diverse collection of products that
            cater to various lifestyles and preferences. From the latest{" "}
            <strong>electronics</strong> and <strong>gadgets</strong> to
            essential <strong>groceries</strong>, stylish{" "}
            <strong>clothing</strong>, and fun-filled <strong>toys</strong>,
            Xstore has something for everyone. Our commitment to affordability
            ensures you get the best value without compromising on quality.
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Why Choose Xstore?
          </Typography>
          <Typography variant="body1" paragraph>
            <ul>
              <li>
                <strong>Convenience:</strong> Shop anytime, anywhere with our
                user-friendly platform designed to save you time and effort.
              </li>
              <li>
                <strong>Affordability:</strong> Enjoy competitive pricing on all
                your favorite products.
              </li>
              <li>
                <strong>Variety:</strong> Explore an extensive range of products
                to fulfill your everyday needs.
              </li>
              <li>
                <strong>Customer-Centric Service:</strong> Experience seamless
                support and fast delivery to enhance your shopping journey.
              </li>
            </ul>
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="body1" paragraph>
            At Xstore, we are not just a store; we are your shopping partner.
            Our goal is to make every purchase enjoyable, reliable, and
            budget-friendly. Choose Xstore today and experience the difference
            in online shopping!
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default AboutPage;
