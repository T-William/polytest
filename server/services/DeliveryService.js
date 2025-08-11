const { Client } = require('@googlemaps/google-maps-services-js');
const googleMapsClient = new Client({});

const calculateDeliveryFee = async (origin, destination) => {
  try {
    const directions = await googleMapsClient.directions({
      origin,
      destination,
      mode: 'driving'
    }).asPromise();

    // Calculate distance in kilometers
    const distance = directions.json.routes[0].legs[0].distance.value / 1000;
    
    // Basic delivery fee calculation (example - adjust as needed)
    // Base fee + $2 per km
    const baseFee = 10;
    const perKmRate = 2;
    const deliveryFee = Math.max(baseFee + (distance * perKmRate), 10);

    return {
      deliveryFee: Math.round(deliveryFee * 100) / 100,
      distance: Math.round(distance * 100) / 100,
      estimatedTime: directions.json.routes[0].legs[0].duration.text
    };
  } catch (error) {
    console.error('Error calculating delivery fee:', error);
    throw error;
  }
};

const validateDeliveryAddress = async (address) => {
  try {
    const geocode = await googleMapsClient.geocode({
      address
    }).asPromise();

    if (!geocode.json.results.length) {
      throw new Error('Invalid address');
    }

    return geocode.json.results[0].geometry.location;
  } catch (error) {
    console.error('Error validating address:', error);
    throw error;
  }
};

module.exports = {
  calculateDeliveryFee,
  validateDeliveryAddress
};
