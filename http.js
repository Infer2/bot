const http = require('http');

const DISCORD_API_BASE_URL = 'https://discord.com/api/v10'; // You may need to adjust the API version

const token = process.env.token; // Replace with your bot token

const options = {
  hostname: 'discord.com',
  port: 443,
  path: '/api/v10/gateway/bot',
  method: 'GET',
  headers: {
    'Authorization': `Bot ${token}`,
  },
};

const req = http.request(options, (res) => {
  let data = '';

  // A chunk of data has been received.
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received.
  res.on('end', () => {
    console.log('Response:', data);
  });
});

// Handle potential error
req.on('error', (error) => {
  console.error('Error:', error);
});

// End the request
req.end();
