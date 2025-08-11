# Compost E-commerce Platform

A full-stack e-commerce application for selling compost with integrated delivery management and payment processing.

## Features

- 🛍️ Product catalog with categories
- 🗺️ Google Maps integration for delivery calculations
- 🚚 Delivery method selection (Pickup/Delivery)
- 💳 Secure payment processing with Stripe
- 📄 PDF receipt generation
- 📧 Email notifications with receipts
- 🔄 Real-time order tracking

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React.js, Redux Toolkit, Material-UI
- **Payment Processing**: Stripe
- **Maps**: Google Maps API
- **Email**: Nodemailer
- **PDF Generation**: PDFKit

## Prerequisites

- Node.js (v16+)
- MongoDB (v5+)
- Stripe account
- Google Cloud Platform account with Maps JavaScript API enabled
- Gmail account for sending emails (or other SMTP service)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/compost-store

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/compost-ecommerce.git
   cd compost-ecommerce
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Start the development server:
   ```bash
   # Start both backend and frontend
   npm run dev:full
   ```

   Or start them separately:
   ```bash
   # Backend
   npm run dev
   
   # Frontend (in a new terminal)
   cd client
   npm start
   ```

## Testing

To test the order flow with a sample order:

```bash
node server/scripts/test-order-flow.js
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/deliveries/calculate` - Calculate delivery fees
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/webhook` - Stripe webhook handler

## Environment Setup for Production

1. Set `NODE_ENV=production` in your production environment
2. Configure a production MongoDB URI
3. Set up a reverse proxy (Nginx/Apache) for the frontend
4. Configure HTTPS with a valid SSL certificate
5. Set up process management (PM2, systemd, etc.)

## License

MIT
