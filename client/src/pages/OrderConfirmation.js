import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Generate a random order number for demo purposes
  const orderNumber = `ORD-${Math.floor(10000000 + Math.random() * 90000000)}`;
  
  // Mock delivery date (3-5 business days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
  const formattedDate = deliveryDate.toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
      <CheckCircleOutlineIcon 
        sx={{ 
          fontSize: 80, 
          color: 'success.main',
          mb: 2
        }} 
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Your order has been received and is being processed.
      </Typography>
      
      <Card variant="outlined" sx={{ mt: 4, mb: 6, textAlign: 'left' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order #{orderNumber}
          </Typography>
          <Typography variant="body1" paragraph>
            We've sent an order confirmation to your email with all the details.
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocalShippingIcon 
                  color="primary" 
                  sx={{ 
                    fontSize: 40, 
                    mr: 2, 
                    mt: 0.5 
                  }} 
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {formattedDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Your order will be delivered by our trusted delivery partner.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <EmailIcon 
                  color="primary" 
                  sx={{ 
                    fontSize: 40, 
                    mr: 2, 
                    mt: 0.5 
                  }} 
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Order Updates
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Check your email for updates
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    We'll send you shipping and delivery updates via email.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="body1" paragraph>
            Need help? Contact our customer support at{' '}
            <Typography 
              component="a" 
              href="mailto:support@compoststore.co.za"
              sx={{ 
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              support@compoststore.co.za
            </Typography>
          </Typography>
        </CardContent>
      </Card>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ minWidth: 200 }}
        >
          Back to Home
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            // In a real app, this would navigate to an order tracking page
            alert('Order tracking would be implemented here');
          }}
          sx={{ minWidth: 200 }}
        >
          Track Order
        </Button>
      </Box>
      
      <Box sx={{ mt: 6, pt: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body2" color="text.secondary">
          Need help with anything else? Visit our{' '}
          <Typography 
            component="a" 
            href="/help" 
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Help Center
          </Typography>{' '}
          or{' '}
          <Typography 
            component="a" 
            href="/contact" 
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Contact Us
          </Typography>.
        </Typography>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;
