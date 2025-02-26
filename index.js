// index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your GitHub Pages domain
app.use(cors({
  origin: ['https://rknight121.github.io', 'http://localhost:3000'],
  methods: ['GET'],
  credentials: false
}));

// Root route
app.get('/', (req, res) => {
  res.send('NOAA Aviation Weather Proxy Server is running');
});

// Proxy endpoint for METAR data
app.get('/api/metar', async (req, res) => {
  try {
    const queryParams = new URLSearchParams(req.query).toString();
    const url = `https://aviationweather.gov/api/data/metar?${queryParams}`;
    
    console.log(`Proxying request to: ${url}`);
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying METAR request:', error.message);
    res.status(500).json({ error: 'Failed to fetch METAR data from NOAA API' });
  }
});

// Proxy endpoint for TAF data
app.get('/api/taf', async (req, res) => {
  try {
    const queryParams = new URLSearchParams(req.query).toString();
    const url = `https://aviationweather.gov/api/data/taf?${queryParams}`;
    
    console.log(`Proxying request to: ${url}`);
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying TAF request:', error.message);
    res.status(500).json({ error: 'Failed to fetch TAF data from NOAA API' });
  }
});

// Start the server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
  });
}

// Export for serverless functions
module.exports = app;