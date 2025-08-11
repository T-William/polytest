import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'Online Store', path: '/store' },
  { text: 'About', path: '/about' },
  { text: 'Contact', path: '/contact' },
];

const Navbar = ({ cartCount }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: '#1B5E20',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top Bar with contact info */}
      <Box sx={{ 
        backgroundColor: '#2E7D32',
        py: 0.5,
        px: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 4 }}>
          <IconButton 
            href="https://www.facebook.com/Polyorganics/" 
            target="_blank" 
            rel="noopener noreferrer"
            size="small"
            sx={{ color: 'white' }}
          >
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton 
            href="https://www.instagram.com/polyorganics2/" 
            target="_blank" 
            rel="noopener noreferrer"
            size="small"
            sx={{ color: 'white' }}
          >
            <InstagramIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <EmailIcon fontSize="small" sx={{ color: '#FF8F00' }} />
            <Typography variant="caption" sx={{ color: 'white', fontSize: '0.8rem' }}>
              sales@polyorganics.co.za
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PhoneIcon fontSize="small" sx={{ color: '#FF8F00' }} />
            <Typography variant="caption" sx={{ color: 'white', fontSize: '0.8rem' }}>
              076 300 9673
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Navigation */}
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo */}
          <Box 
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              mr: 4,
            }}
          >
            <img 
              src="/logo.svg" 
              alt="PolyOrganics Logo" 
              style={{ 
                height: isMobile ? '40px' : '60px',
                width: 'auto',
              }}
            />
          </Box>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: 'white',
                  mx: 1,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  letterSpacing: '0.5px',
                  '&:hover': {
                    color: '#FF8F00',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          {/* Cart Button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={RouterLink}
              to="/cart"
              variant="contained"
              color="secondary"
              startIcon={
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              }
              sx={{
                ml: 2,
                px: 3,
                py: 1,
                borderRadius: '4px',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '0.5px',
                '&:hover': {
                  backgroundColor: '#E65100',
                },
              }}
            >
              Cart
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
