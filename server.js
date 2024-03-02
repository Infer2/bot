const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/come') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', async () => {
      const body = JSON.parse(data);
      const interactionId = body.id;
      const interactionToken = body.token;
      
      try {
        await sendInteractionResponse(interactionId, interactionToken, 'hello!', true);
        res.writeHead(200);
        res.end();
      } catch (error) {
        console.error('Failed to reply:', error);
        res.writeHead(500);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function sendInteractionResponse(interactionId, interactionToken, content, ephemeral) {
    return new Promise((resolve, reject) => {
      const options = {
      hostname: 'discord.com',
      port: 443,
      path: `/api/v9/interactions/${interactionId}/${interactionToken}/callback`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const payload = {
        type: 4,
        data: {
          content: content,
          flags: ephemeral ? 64 : 0,
        },
      };
  
      // Validate payload
      if (!payload.data.content) {
        console.error("Missing content in payload");
        reject(new Error("Missing content in payload"));
        return;
      }
  
      const req = http.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`); // Log status code
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`Failed to send interaction response. Status code: ${res.statusCode}`));
        }
      });
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(JSON.stringify(payload));
    req.end();
  });
}
