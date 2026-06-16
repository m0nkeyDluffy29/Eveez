import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the server entry
const { default: serverHandler } = await import(join(__dirname, '../../dist/server/index.js'));

export default async (req, res) => {
  try {
    const response = await serverHandler.fetch(
      new Request(new URL(req.url, `http://${req.headers.host}`), {
        method: req.method,
        headers: req.headers,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? req : null,
      })
    );

    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
};
