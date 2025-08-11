import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import { mockDeliveryOptions } from '../data/mockData';

const Checkout = ({ cart, onClearCart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    saveInfo: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const navigate = useNavigate();
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('sm')); // Keep for responsive behavior
  const steps = ['Delivery', 'Payment', 'Confirmation'];
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedDelivery = mockDeliveryOptions.find(option => option.id === deliveryMethod);
  const total = subtotal + (selectedDelivery?.price || 0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Submit order
      handleSubmitOrder();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDeliveryMethodChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleSubmitOrder = () => {
    // In a real app, this would submit to your backend
    console.log('Submitting order', { ...formData, deliveryMethod, cart, total });
    
    // Mock payment processing
    setTimeout(() => {
      // Clear cart and show success message
      onClearCart();
      setSnackbarMessage('Order placed successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Navigate to confirmation page
      navigate('/order-confirmation');
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Typography variant="h6" gutterBottom>
                Delivery Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="postalCode"
                    name="postalCode"
                    label="Postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="saveInfo"
                        color="primary"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                      />
                    }
                    label="Save this information for next time"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                Delivery Method
              </Typography>
              <RadioGroup
                aria-label="delivery method"
                name="deliveryMethod"
                value={deliveryMethod}
                onChange={handleDeliveryMethodChange}
              >
                {mockDeliveryOptions.map((option) => (
                  <Card
                    key={option.id}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      borderColor: deliveryMethod === option.id ? 'primary.main' : 'divider',
                      backgroundColor: deliveryMethod === option.id ? 'action.selected' : 'background.paper',
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Radio value={option.id} />
                        <Box sx={{ ml: 2, flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">
                              {option.name} {option.icon}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {option.price > 0 ? `R${option.price.toFixed(2)}` : 'Free'}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {option.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Estimated delivery: {option.estimatedDelivery}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                For this demo, we'll use a mock PayFast integration.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                In a production environment, you would be redirected to PayFast's secure payment page to complete your purchase.
              </Typography>
              <img 
                src="https://www.payfast.co.za/assets/images/logos-and-images/payfast-logo-vector.png" 
                alt="PayFast" 
                style={{ maxWidth: '200px', margin: '20px 0' }}
              />
              <Typography variant="body2" color="text.secondary">
                By clicking "Place Order", you agree to our Terms and Conditions and Privacy Policy.
              </Typography>
            </Card>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Order
            </Typography>
            <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Order Summary
              </Typography>
              {cart.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    R{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>R{subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Delivery ({selectedDelivery?.name})</Typography>
                <Typography>
                  {selectedDelivery?.price > 0 ? `R${selectedDelivery.price.toFixed(2)}` : 'Free'}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  R{total.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Deliver to: {formData.address}, {formData.city}, {formData.postalCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact: {formData.email} | {formData.phone}
              </Typography>
            </Card>
            <Alert severity="info" sx={{ mb: 3 }}>
              This is a demo. No real payment will be processed.
            </Alert>
          </Box>
        );
      
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === steps.length ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Thank you for your order!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your order has been placed and is being processed. You will receive a confirmation email shortly.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && (
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.address ||
                  !formData.city ||
                  !formData.postalCode
                ))
              }
            >
              {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </Button>
          </Box>
        </>
      )}
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
