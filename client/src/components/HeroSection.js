import React from 'react';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: isMobile ? '70vh' : '80vh',
        backgroundImage: 'url("/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textAlign: isMobile ? 'center' : 'left',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: isMobile ? '100%' : '50%' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{
              fontWeight: 700,
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'white',
            }}
          >
            Premium Organic Compost
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            High-quality, nutrient-rich compost for healthier plants and a greener planet.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <Button
              component={RouterLink}
              to="/store"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                '&:hover': {
                  backgroundColor: '#E65100',
                },
              }}
            >
              Shop Now
            </Button>
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
