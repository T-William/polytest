import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1B5E20',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#FF8F00' }}>
              ABOUT US
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              PolyOrganics is committed to providing high-quality organic compost and gardening 
              solutions that help you grow healthier plants while protecting the environment.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <IconButton 
                href="https://www.facebook.com/Polyorganics/" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'white', '&:hover': { color: '#FF8F00' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                href="https://www.instagram.com/polyorganics2/" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'white', '&:hover': { color: '#FF8F00' } }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#FF8F00' }}>
              QUICK LINKS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                component={RouterLink} 
                to="/" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: '#FF8F00' } }}
              >
                Home
              </Link>
              <Link 
                component={RouterLink} 
                to="/store" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: '#FF8F00' } }}
              >
                Shop
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: '#FF8F00' } }}
              >
                About Us
              </Link>
              <Link 
                component={RouterLink} 
                to="/contact" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: '#FF8F00' } }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#FF8F00' }}>
              CONTACT US
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#FF8F00' }} />
                <Typography variant="body2">
                  123 Green Valley, Eco Park<br />
                  Cape Town, 8001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#FF8F00' }} />
                <Typography variant="body2">
                  076 300 9673
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#FF8F00' }} />
                <Typography variant="body2">
                  sales@polyorganics.co.za
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Business Hours */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#FF8F00' }}>
              BUSINESS HOURS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Monday - Friday:</Typography>
                <Typography variant="body2">8:00 AM - 5:00 PM</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Saturday:</Typography>
                <Typography variant="body2">8:00 AM - 1:00 PM</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Sunday:</Typography>
                <Typography variant="body2">Closed</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />

        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} PolyOrganics. All Rights Reserved.
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Link 
              href="/privacy-policy" 
              color="inherit" 
              variant="body2"
              underline="hover"
              sx={{ '&:hover': { color: '#FF8F00' } }}
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link 
              href="/terms" 
              color="inherit" 
              variant="body2"
              underline="hover"
              sx={{ '&:hover': { color: '#FF8F00' } }}
            >
              Terms & Conditions
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
